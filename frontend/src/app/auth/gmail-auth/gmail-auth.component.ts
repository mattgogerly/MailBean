import { Component, OnInit } from '@angular/core';
import { shell } from 'electron';
const server = require('node-http-server');

@Component({
  selector: 'app-gmail-auth',
  templateUrl: './gmail-auth.component.html',
  styleUrls: ['./gmail-auth.component.css']
})
export class GmailAuthComponent implements OnInit {

  private LOCAL_SERVER_PORT = 18363;
  private REDIRECT_URL = 'http://127.0.0.1' + this.LOCAL_SERVER_PORT;
  private CLIENT_ID = '634807762350-ohpmnrkua0cj7nlkfkpbvlirn1dchudh.apps.googleusercontent.com';
  private GMAIL_SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email', // email address
    'https://www.googleapis.com/auth/userinfo.profile', // G+ profile
    'https://mail.google.com/', // email
    'https://www.googleapis.com/auth/contacts.readonly', // contacts
  ];
  private server: any;

  constructor() { }

  ngOnInit() {
    shell.openExternal(this.buildAuthURL());

    const config = new server.Config();
    config.port = this.LOCAL_SERVER_PORT;
    server.onRequest = this.onRequestReceived;
    server.deploy(config);
  }

  private onRequestReceived(req, res, serve) {
    const code = req.query.code;
    console.log(code);
    this.onCodeReceived(code);
    return false;
  }

  private async onCodeReceived(code) {
    let account = null;
    try {
      account = 'hi';
    } catch (err) {
      console.error(err);
    }
  }

  private buildAuthURL() {
    return 'https://accounts.google.com/o/oauth2/auth?client_id=' + this.CLIENT_ID + '&redirect_uri=' +
      encodeURIComponent(this.REDIRECT_URL) + '&response_type=code&scope=' + encodeURIComponent(this.GMAIL_SCOPES.join(' ')) +
      '&access_type=offline&select_account%20consent';
  }

}
