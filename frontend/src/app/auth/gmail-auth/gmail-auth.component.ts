import { Component, OnDestroy, OnInit } from '@angular/core';
import { shell } from 'electron';
import { AccountHandler } from '../utils/AccountHandler';
import * as url from 'url';
import * as http from 'http';

@Component({
  selector: 'app-gmail-auth',
  templateUrl: './gmail-auth.component.html',
  styleUrls: ['./gmail-auth.component.scss']
})
export class GmailAuthComponent implements OnInit, OnDestroy {

  private AccountHandler: AccountHandler;
  private server: http.Server;
  private LOCAL_SERVER_URI = 'http://127.0.0.1:18363/';
  private LOCAL_SERVER_PORT = 18363;
  public GMAIL_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email', // email address
    'https://www.googleapis.com/auth/userinfo.profile', // G+ profile
    'https://mail.google.com/', // email
    'https://www.googleapis.com/auth/contacts.readonly', // contacts
  ];
  authStatus = 'pending';

  constructor() {
    this.AccountHandler = new AccountHandler();
  }

  ngOnInit() {
    // Set up response handler for when we receive auth code
    const responseHandler = (request, response) => {
      const { query } = url.parse(request.url, true);

      response.writeHead(302, {Location: 'https://google.co.uk'});
      response.end();

      if (query.code) {
        this.onCodeReceived(query.code);
      }
    };

    // create a server to listen for the response
    this.server = http.createServer(responseHandler).listen(this.LOCAL_SERVER_PORT);

    // open auth URL in browser
    shell.openExternal(this.buildAuthURL());
  }

  ngOnDestroy() {
    // close the server, otherwise it'll stay open even when we close the app
    this.server.close();
  }

  private async onCodeReceived(code) {
    try {
      // try and construct the account
      await this.AccountHandler.constructGmailAccount(code);
      this.authStatus = 'complete';
    } catch (err) {
      console.error(err);
      this.authStatus = 'error';
    }
  }

  private buildAuthURL() {
    return 'https://accounts.google.com/o/oauth2/auth?client_id=' + this.AccountHandler.CLIENT_ID + '&redirect_uri=' +
      encodeURIComponent(this.LOCAL_SERVER_URI) + '&response_type=code&scope=' +
      encodeURIComponent(this.GMAIL_SCOPES.join(' ')) + '&access_type=offline&select_account%20consent';
  }

}
