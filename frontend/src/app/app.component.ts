import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GetAccountsPending } from './redux/actions/account.actions';
import { Observable } from 'rxjs';
import { AccountStore } from './redux/interfaces/account-store.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading = false;
  error = false;
  accountsInfo$: Observable<AccountStore>;

  constructor(private store: Store<any>, private router: Router, private snackBar: MatSnackBar) {
    this.accountsInfo$ = this.store.select('accountsInfo');
  }

  ngOnInit(): void {
    this.accountsInfo$.subscribe(accountsInfo => {
      const composing = this.router.url.includes('compose');

      if (composing) {
        this.loading = false;
      } else if (accountsInfo.pending !== true && accountsInfo.accounts.length > 0) {
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

    this.store.pipe(select((state: any) => state.messages.error))
      .subscribe(err => {
        if (err !== false) {
          this.snackBar.open(err, 'X');
        }
      });

    this.store.pipe(select((state: any) => state.accountsInfo.error))
      .subscribe(err => {
        if (err !== false) {
          this.snackBar.open(err, 'X');
        }
      });

    this.loading = true;
    this.store.dispatch(new GetAccountsPending()); // fetch account info from API
  }
}
