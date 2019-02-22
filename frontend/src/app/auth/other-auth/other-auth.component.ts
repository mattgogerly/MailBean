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
  private AccountHandler: AccountHandler;

  constructor(private router: Router) {
    this.AccountHandler = new AccountHandler();
  }

  ngOnInit() {
  }

  async submit() {
    const account = await this.AccountHandler.constructAccountFromInfo({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (account.settings.imap_host) {
      this.router.navigate(['/auth/success']);
    } else {
      this.step = 2;
    }
  }

}
