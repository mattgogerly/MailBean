import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AccountActions from '../actions/account.actions';
import * as MessageActions from '../actions/message.actions';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MessageService } from '../services/message.service';
import { SetCurrentAccountSuccess } from '../actions/account.actions';
import {
  DeleteMessagePending,
  GetLocalPending, GetLocalSuccess,
  ReadMessagePending,
  SendMessagePending, SendMessageSuccess,
  SyncServerPending,
  SyncServerSuccess
} from '../actions/message.actions';

@Injectable()
export class MessageEffects {

  private cachedAccountId: string;

  constructor(private actions$: Actions, private messageService: MessageService, private store: Store<any>) {}

  @Effect()
  syncWithServerAfterSettingAccount$: Observable<Action> = this.actions$.pipe(
    ofType<SetCurrentAccountSuccess>(AccountActions.ActionTypes.SetCurrentAccountSuccess),
    withLatestFrom(this.store),
    map(([action, storeState]) => storeState.accountsInfo.currentAccount),
    mergeMap(id => {
      this.cachedAccountId = id;
      return [
        new MessageActions.GetLocalPending(id),
        new MessageActions.SyncServerPending({id: id}),
      ];
    })
  );

  @Effect()
  syncWithServer$: Observable<Action> = this.actions$.pipe(
    ofType<SyncServerPending>(MessageActions.ActionTypes.SyncServerPending),
    switchMap(action => {
      return this.messageService.syncWithServer(action.payload.id).pipe(
        map(
          response => new MessageActions.SyncServerSuccess(response)
        ),
        catchError(error => {
          return of(new MessageActions.SyncServerFailure(error));
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

  @Effect()
  changeFolderAfterAccountSwitch$: Observable<Action> = this.actions$.pipe(
    ofType<GetLocalSuccess>(MessageActions.ActionTypes.GetLocalSuccess),
    withLatestFrom(this.store),
    map(([action, storeState]) => {
      if (storeState.accountsInfo.currentAccount !== this.cachedAccountId) {
        if (storeState.messages.folders.length > 0) {
          return storeState.messages.folders[0].name;
        } else if (storeState.messages.folders.findIndex(f => f.name === '[Gmail]/All Mail') > -1) {
          return '[Gmail]/All Mail';
        } else {
          return 'Inbox';
        }
      } else {
        return false;
      }
    }),
    switchMap(folder => {
      if (!folder) {
        return EMPTY;
      } else {
        return of(new MessageActions.ChangeActiveFolder(folder));
      }
    })
  );

  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteMessagePending>(MessageActions.ActionTypes.DeleteMessagePending),
    withLatestFrom(this.store),
    switchMap(([action, storeState]) => {
      return this.messageService.delete(storeState.accountsInfo.currentAccount, action.payload).pipe(
        map(
          response => new MessageActions.DeleteMessageSuccess(response)
        ),
        catchError(error => {
          return of(new MessageActions.DeleteMessageFailure(error));
        })
      );
    }));

  @Effect()
  markRead$: Observable<Action> = this.actions$.pipe(
    ofType<ReadMessagePending>(MessageActions.ActionTypes.ReadMessagePending),
    withLatestFrom(this.store),
    switchMap(([action, storeState]) => {
      return this.messageService.markRead(storeState.accountsInfo.currentAccount, action.payload).pipe(
        map(
          response => new MessageActions.ReadMessageSuccess(response)
        ),
        catchError(error => {
          return of(new MessageActions.ReadMessageFailure(error));
        })
      );
    }));

  @Effect()
  sendMessage$: Observable<Action> = this.actions$.pipe(
    ofType<SendMessagePending>(MessageActions.ActionTypes.SendMessagePending),
    withLatestFrom(this.store),
    switchMap(([action, storeState]) => {
      return this.messageService.sendMessage(storeState.accountsInfo.currentAccount, action.payload).pipe(
        map(
          () => new MessageActions.SendMessageSuccess(true)
        ),
        catchError(error => {
          return of(new MessageActions.SendMessageFailure(error));
        })
      );
    }));

  @Effect()
  syncAfterSend$: Observable<Action> = this.actions$.pipe(
    ofType<SendMessageSuccess>(MessageActions.ActionTypes.SendMessageSuccess),
    withLatestFrom(this.store),
    map(([action, storeState]) => storeState.accountsInfo.currentAccount),
    switchMap(id => {
      return of(new MessageActions.SyncServerPending({id: id}));
    })
  );
}
