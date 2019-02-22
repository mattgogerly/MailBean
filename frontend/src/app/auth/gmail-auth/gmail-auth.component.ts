import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { shell } from 'electron';
import { AccountHandler } from '../utils/AccountHandler';
import * as http from 'http';
import * as url from 'url';

@Component({
  selector: 'app-gmail-auth',
  templateUrl: './gmail-auth.component.html',
  styleUrls: ['./gmail-auth.component.css']
})
export class GmailAuthComponent implements OnInit {

  private AccountHandler: AccountHandler;
  private server: any;
  authStatus = 'pending';

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.AccountHandler = new AccountHandler();
  }

  ngOnInit() {
    shell.openExternal(this.buildAuthURL());

    this.server = http.createServer((req, res) => {
      const { query } = url.parse(req.url, true);
      if (query.code) {
        this.onCodeReceived(query.code);
        // redirect to a nicer static page here
        res.end();
      } else {
        res.end('Error');
        this.authStatus = 'error';
      }
    });
    this.server.listen(this.AccountHandler.LOCAL_SERVER_PORT, err => {
      if (err) {
        console.error(err);
      }
    });
  }

  private async onCodeReceived(code) {
    try {
      await this.AccountHandler.constructGmailAccount(code);
      this.authStatus = 'complete';
      this.changeDetectorRef.detectChanges();
    } catch (err) {
      console.error(err);
      this.authStatus = 'error';
    }
  }

  private buildAuthURL() {
    const localServer = this.AccountHandler.LOCAL_SERVER_HOST + ':' + this.AccountHandler.LOCAL_SERVER_PORT;
    return 'https://accounts.google.com/o/oauth2/auth?client_id=' + this.AccountHandler.CLIENT_ID + '&redirect_uri=' +
      encodeURIComponent(localServer) + '&response_type=code&scope=' + encodeURIComponent(this.AccountHandler.GMAIL_SCOPES.join(' ')) +
      '&access_type=offline&select_account%20consent';
  }

}
