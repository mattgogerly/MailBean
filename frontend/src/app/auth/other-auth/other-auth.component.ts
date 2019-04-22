import { Component } from '@angular/core';
import { AccountHandler } from '../utils/AccountHandler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-auth',
  templateUrl: './other-auth.component.html',
  styleUrls: ['./other-auth.component.scss']
})
export class OtherAuthComponent {

  public authStatus = 'pending';
  public failure = false;
  public step = 1;
  public name: string;
  public email: string;
  public password: string;

  public imapHost: string;
  public imapPort: number;
  public imapSecurity: string;
  public smtpHost: string;
  public smtpPort: number;
  public smtpSecurity: string;

  private AccountHandler: AccountHandler;

  constructor(private router: Router) {
    this.AccountHandler = new AccountHandler();
  }

  async submit() {
    // try and create the account
    const account = await this.AccountHandler.constructOtherAccount({
      name: this.name,
      email: this.email,
      password: this.password
    }, true);

    // if it was successful we're done
    if (account !== false) {
      this.authStatus = 'complete';

      setTimeout(() => {
        this.router.navigate(['/main']);
      }, 2000);
    } else {
      // if it failed move on to step 2
      this.step = 2;
    }
  }

  async submitStepTwo() {
    const account = await this.AccountHandler.constructOtherAccount({
      name: this.name,
      email: this.email,
      password: this.password,
      connectionSettings: {
        imapHost: this.imapHost,
        imapPort: this.imapPort,
        imapSecurity: this.imapSecurity,
        smtpHost: this.smtpHost,
        smtpPort: this.smtpPort,
        smtpSecurity: this.smtpSecurity
      }
    }, false);

    // if it was successful we're done
    if (account !== false) {
      this.authStatus = 'complete';

      setTimeout(() => {
        this.router.navigate(['/main']);
      }, 2000);
    } else {
      // otherwise make them try again
      this.authStatus = 'error';
    }
  }

}
