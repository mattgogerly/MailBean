import { Component, OnInit } from '@angular/core';
import { AccountHandler } from '../utils/AccountHandler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-auth',
  templateUrl: './other-auth.component.html',
  styleUrls: ['./other-auth.component.css']
})
export class OtherAuthComponent implements OnInit {

  public authStatus = 'pending';
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

  ngOnInit() {
  }

  async submit() {
    const account = await this.AccountHandler.constructOtherAccount({
      name: this.name,
      email: this.email,
      password: this.password
    }, true);

    if (account !== false) {
      this.router.navigate(['/auth/success']);
    } else {
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

    if (account !== false) {
      this.router.navigate(['/auth/success']);
    } else {
      this.router.navigate(['/auth/failure']);
    }
  }

}
