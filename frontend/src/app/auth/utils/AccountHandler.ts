import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonProviders } from './CommonProviders';
import * as crypto from 'crypto';
import { ipcRenderer } from 'electron';
import { Injectable } from '@angular/core';
import { AppInjector} from '../../app-injector';

@Injectable()
export class AccountHandler {
  private http: HttpClient;
  public LOCAL_SERVER_HOST = 'http://127.0.0.1';
  public LOCAL_SERVER_PORT = 18363;
  public CLIENT_ID = '634807762350-ohpmnrkua0cj7nlkfkpbvlirn1dchudh.apps.googleusercontent.com';
  public GMAIL_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email', // email address
    'https://www.googleapis.com/auth/userinfo.profile', // G+ profile
    'https://mail.google.com/', // email
    'https://www.googleapis.com/auth/contacts.readonly', // contacts
  ];
  private CLIENT_SECRET = 'xnhTTXlur3LIIOueUXSaPKXW';

  constructor() {
    this.http = AppInjector.get(HttpClient);
  }

  public addPasswordToManager(account: any) {
    return ipcRenderer.sendSync('set-password', account.id, account.password);
  }

  public deletePasswordFromManager(email: string) {
    const hash = crypto.createHash('sha256');
    hash.update(email);

    return ipcRenderer.sendSync('delete-password', hash.digest('hex'))
      .then(() => true)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  public async constructAccountFromInfo(account: any) {
    const emailDomain = account.email.split('@')[1].toLowerCase(); // get the domain from the email

    let recommendedSettings = CommonProviders[emailDomain];
    if (recommendedSettings) {
      if (recommendedSettings.alias) {
        recommendedSettings = CommonProviders[recommendedSettings.alias]; // if the result is an alias get the actual result
      }
    } else {
      recommendedSettings = {};
    }

    const defaultSettings = {
      imap_host: recommendedSettings.imap_host,
      imap_port: recommendedSettings.imap_port,
      imap_username: account.email,
      imap_password: account.password,
      imap_security: recommendedSettings.imap_security || 'SSL / TLS',
      imap_allow_insecure_ssl: recommendedSettings.imap_allow_insecure_ssl || false,
      smtp_host: recommendedSettings.smtp_host,
      smtp_port: recommendedSettings.smtp_port || 587,
      smtp_username: recommendedSettings.email,
      smtp_password: account.password,
      smtp_security: recommendedSettings.smtp_security || 'STARTTLS',
      smtp_allow_insecure_ssl: recommendedSettings.smtp_allow_insecure_ssl || false
    };
    account.settings = Object.assign(defaultSettings, account.settings);
    return account;
  }

  public async constructGmailAccount(code: string) {
    const body = [];
    body.push('code=' + encodeURIComponent(code));
    body.push('client_id=' + encodeURIComponent(this.CLIENT_ID));
    body.push('redirect_uri=' + encodeURIComponent(this.LOCAL_SERVER_HOST + ':' + this.LOCAL_SERVER_PORT));
    body.push('client_secret=' + encodeURIComponent(this.CLIENT_SECRET));
    body.push('grant_type=' + encodeURIComponent('authorization_code'));

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
    const { access_token, refresh_token, ...other } = json;

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

    const hash = crypto.createHash('sha256');
    hash.update(data.email);
    const id = hash.digest('hex');

    const account = await this.constructAccountFromInfo({
      id: id,
      name: data.name,
      email: data.email,
      provider: 'gmail',
      client_id: this.CLIENT_ID,
      refresh_token: refresh_token,
      password: access_token
    });

    await this.addPasswordToManager(account);
    return true;
  }

}
