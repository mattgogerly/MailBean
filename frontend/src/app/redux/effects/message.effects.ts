import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AccountActions from '../actions/account.actions';
import * as MessageActions from '../actions/message.actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MessageService } from '../services/message.service';
import { SetCurrentAccountSuccess } from '../actions/account.actions';
import {
  GetLocalPending,
  SyncServerPending,
  SyncServerSuccess
} from '../actions/message.actions';

@Injectable()
export class MessageEffects {
  constructor(private actions$: Actions, private messageService: MessageService, private store: Store<any>) {}

  @Effect()
  syncWithServerAfterSettingAccount$: Observable<Action> = this.actions$.pipe(
    ofType<SetCurrentAccountSuccess>(AccountActions.ActionTypes.SetCurrentAccountSuccess),
    withLatestFrom(this.store),
    map(([action, storeState]) => storeState.accountsInfo.currentAccount),
    switchMap(id => [
      new MessageActions.SyncServerPending({id: id}),
      new MessageActions.GetLocalPending(id)
    ])
  );

  @Effect()
  syncWithServer$: Observable<Action> = this.actions$.pipe(
    ofType<SyncServerPending>(MessageActions.ActionTypes.SyncServerPending),
    switchMap(action => {
      return this.messageService.syncWithServer(action.payload.id).pipe(
        map(
          () => new MessageActions.SyncServerSuccess()
        ),
        catchError(() => {
          return of(new MessageActions.SyncServerFailure());
        })
      );
    })
  );

  @Effect()
  getLocal$: Observable<Action> = this.actions$.pipe(
    ofType<GetLocalPending>(MessageActions.ActionTypes.GetLocalPending),
    switchMap(action => {
      return this.messageService.getLocal(action.payload).pipe(
        map(
          response => new MessageActions.GetLocalSuccess(response)
        ),
        catchError(error => {
          return of(new MessageActions.GetLocalFailure(error));
        })
      );
    })
  );

  @Effect()
  getLocalAfterServerFetch: Observable<Action> = this.actions$.pipe(
    ofType<SyncServerSuccess>(MessageActions.ActionTypes.SyncServerSuccess),
    withLatestFrom(this.store),
    switchMap(([action, storeState]) => {
      return of(new MessageActions.GetLocalPending(storeState.accountsInfo.currentAccount));
    })
  );
}
