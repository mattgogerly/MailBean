import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetAccountsPending } from './redux/actions/account.actions';
import { Observable } from 'rxjs';
import { AccountStore } from './redux/interfaces/account-store.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;
  error = false;
  accountsInfo$: Observable<AccountStore>;

  constructor(private store: Store<any>, private router: Router) {
    this.accountsInfo$ = this.store.select('accountsInfo');
  }

  ngOnInit(): void {
    this.accountsInfo$.subscribe(accountsInfo => {
      if (accountsInfo.pending !== true && accountsInfo.accounts.length > 0) {
        this.loading = false;
        this.router.navigate(['main']);
      } else if (accountsInfo.pending !== true) {
        this.loading = false;
        this.router.navigate(['auth']);
      } else if (accountsInfo.error === true) {
        this.error = true;
        // close window here
      }
    });

    this.loading = true;
    this.store.dispatch(new GetAccountsPending()); // fetch account info from API
  }
}
