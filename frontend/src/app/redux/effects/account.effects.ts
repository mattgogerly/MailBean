import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AccountService } from '../services/account.service';
import * as AccountActions from '../actions/account.actions';
import {switchMap, map, catchError, flatMap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  AddAccountPending, AddAccountSuccess,
  DeleteAccountPending,
  GetAccountsSuccess,
  SetCurrentAccountPending
} from '../actions/account.actions';
import {EMPTY} from "rxjs/internal/observable/empty";

@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, private accountService: AccountService) {}

  @Effect()
  getAccounts$: Observable<Action> = this.actions$.pipe(
    ofType(AccountActions.ActionTypes.GetAccountsPending),
    switchMap(() => {
      return this.accountService.getAccounts().pipe(
        map(
          accounts => new AccountActions.GetAccountsSuccess(accounts)
        ),
        catchError(() => {
          return of(new AccountActions.GetAccountsFailure('Could not get account information. ' +
            'Try restarting the client.'));
        })
      );
    })
  );

  @Effect()
  getAccountsSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<GetAccountsSuccess>(AccountActions.ActionTypes.GetAccountsSuccess),
    flatMap(action => {
      let account;
      if (action.payload.length > 0) {
        account = action.payload[0].id;
      } else {
        account = null;
      }

      if (account != null) {
        return of(new AccountActions.SetCurrentAccountPending(account));
      } else {
        return EMPTY;
      }
    })
  );

  @Effect()
  addAccount$: Observable<Action> = this.actions$.pipe(
    ofType<AddAccountPending>(AccountActions.ActionTypes.AddAccountPending),
    switchMap(action => {
      return this.accountService.addAccount(action.payload).pipe(
        map(
          account => new AccountActions.AddAccountSuccess(account)
        ),
        catchError(() => {
          return of(new AccountActions.AddAccountFailure('Could not add account. Please restart the client and ' +
            'try again.'));
        })
      );
    })
  );

  @Effect()
  addAccountSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<AddAccountSuccess>(AccountActions.ActionTypes.AddAccountSuccess),
    switchMap(() => {
      return of(new AccountActions.GetAccountsPending());
    })
  );

  @Effect()
  deleteAccount$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteAccountPending>(AccountActions.ActionTypes.DeleteAccountPending),
    switchMap(action => {
      return this.accountService.deleteAccount(action.payload).pipe(
        map(
          () => new AccountActions.DeleteAccountSuccess(action.payload)
        ),
        catchError(() => {
          return of(new AccountActions.DeleteAccountFailure('Could not delete account. Please restart the client' +
            'and try again.'));
        })
      );
    })
  );

  @Effect()
  setAccount$: Observable<Action> = this.actions$.pipe(
    ofType<SetCurrentAccountPending>(AccountActions.ActionTypes.SetCurrentAccountPending),
    switchMap(action => {
      return this.accountService.setCurrentAccount(action.payload).pipe(
        map(
            () => new AccountActions.SetCurrentAccountSuccess(action.payload)
          ),
          catchError(() => {
            return of(new AccountActions.SetCurrentAccountFailure('Could not set current account. Please restart' +
              'the client and try again.'));
          })
        );
    })
  );
}
