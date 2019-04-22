import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonProviders } from './CommonProviders';
import * as crypto from 'crypto';
import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';
import { AppInjector} from '../../app-injector';
import { Store } from '@ngrx/store';
import { AddAccountPending } from '../../redux/actions/account.actions';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AccountHandler {
  private http: HttpClient;
  private store: Store<any>;

  public LOCAL_SERVER_URI = 'http://127.0.0.1:18363/';
  public CLIENT_ID = '634807762350-ohpmnrkua0cj7nlkfkpbvlirn1dchudh.apps.googleusercontent.com';
  private CLIENT_SECRET = 'xnhTTXlur3LIIOueUXSaPKXW';

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.store = AppInjector.get(Store);
  }

  public static addPasswordToManager(account: any, password: string) {
    // set password in platform's credential manager (e.g. KeyChain on macOS)
    ipcRenderer.sendSync('set-password', account.id, password);
  }

  public static deletePasswordFromManager(id: string) {
    // delete password in platform's credential manager
    return ipcRenderer.sendSync('delete-password', id);
  }

  public static getPasswordFromManager(id: string) {
    // get password from platform's credential manager
    return ipcRenderer.sendSync('get-password', id);
  }

  public async constructAccountFromInfo(account: any, firstAttempt: boolean = true) {
    const emailDomain = account.email.split('@')[1].toLowerCase(); // get the domain from the email
    account.provider = emailDomain;

    // second attempt asks for connection info so don't try and get the defaults this time
    if (firstAttempt) {
      let recommendedSettings = CommonProviders[emailDomain];
      if (recommendedSettings) {
        if (recommendedSettings.alias) {
          recommendedSettings = CommonProviders[recommendedSettings.alias]; // if the result is an alias get the actual result
        }
      } else {
        recommendedSettings = {};
      }

      const defaultSettings = {
        imapHost: recommendedSettings.imap_host,
        imapPort: recommendedSettings.imap_port,
        imapSecurity: recommendedSettings.imap_security || 'SSL / TLS',
        smtpHost: recommendedSettings.smtp_host,
        smtpPort: recommendedSettings.smtp_port || 587,
        smtpSecurity: recommendedSettings.smtp_security || 'STARTTLS',
      };
      account.connectionSettings = Object.assign(defaultSettings, account.connectionSettings);
    }

    // hash the email as the id
    const hash = crypto.createHash('sha256');
    hash.update(account.email);
    account.id = hash.digest('hex');

    return account;
  }

  public async constructOtherAccount(info: any, firstAttempt: boolean) {
    // don't want to send the password here as the API model won't map properly with it included
    // extract it and then delete it from the object
    const password = info.password;
    delete info.password;

    // try and construct the account
    const account = await this.constructAccountFromInfo(info, firstAttempt);
    // if we couldn't get default connection info then fail
    if (account.connectionSettings.imapHost === undefined) {
      return false;
    }

    // try and connect with the details provided
    const connectionSuccessful = await this.http
      .post<boolean>(environment.localApi + '/accounts/test/' + password, account).toPromise();

    // if we couldn't connect then fail
    if (!connectionSuccessful) {
      return false;
    }

    // add the password to the platform's credential manager
    await AccountHandler.addPasswordToManager(account, password);
    // add the account to our store/send to API
    await this.store.dispatch(new AddAccountPending(account));

    return account;
  }

  public async constructGmailAccount(code: string) {
    const body = [];
    body.push('code=' + encodeURIComponent(code));
    body.push('client_id=' + encodeURIComponent(this.CLIENT_ID));
    body.push('redirect_uri=' + encodeURIComponent(this.LOCAL_SERVER_URI));
    body.push('client_secret=' + encodeURIComponent(this.CLIENT_SECRET));
    body.push('grant_type=' + encodeURIComponent('authorization_code'));

    // send code we received from OAuth to get access and refresh tokens for account
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    const json: any = (await this.http.post(
        'https://www.googleapis.com/oauth2/v4/token',
        body.join('&'),
        options
      ).toPromise()) || {error: true};
    if (json.error) {
      return false;
    }
    const { access_token, refresh_token } = json;

    // get Account info (email, name etc) using the access_token
    const optionsTwo = {
      headers: new HttpHeaders({'Authorization': 'Bearer' + access_token})
    };
    const data: any = await this.http.get(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      optionsTwo
    ).toPromise() || {error: true};
    if (data.error) {
      return false;
    }

    // construct the rest of the account object
    const account = await this.constructAccountFromInfo({
      name: data.name,
      email: data.email
    });

    // add refresh token to platform's credential manager
    await AccountHandler.addPasswordToManager(account, refresh_token);
    // add account to store and API
    this.store.dispatch(new AddAccountPending(account));

    return true;
  }

}
