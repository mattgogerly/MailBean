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
        new MessageActions.SyncServerPending({id: id, limit: -1}),
      ];
    })
  );

  @Effect()
  syncWithServer$: Observable<Action> = this.actions$.pipe(
    ofType<SyncServerPending>(MessageActions.ActionTypes.SyncServerPending),
    switchMap(action => {
      return this.messageService.syncWithServer(action.payload.id, action.payload.limit).pipe(
        map(
          () => new MessageActions.SyncServerSuccess()
        ),
        catchError(() => {
          return of(new MessageActions.SyncServerFailure('Could not sync with the backend. Please restart the ' +
            'client and try again.'));
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
        catchError(() => {
          return of(new MessageActions.GetLocalFailure('Could not retrieve data from local storage. Please' +
            'restart the client and try again.'));
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
          () => new MessageActions.DeleteMessageSuccess()
        ),
        catchError(() => {
          return of(new MessageActions.DeleteMessageFailure('Could not delete message. Please refresh and try ' +
            'again.'));
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
          () => new MessageActions.ReadMessageSuccess()
        ),
        catchError(() => {
          return of(new MessageActions.ReadMessageFailure('Could not mark message as read. Please refresh and try' +
            'again.'));
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
          () => new MessageActions.SendMessageSuccess()
        ),
        catchError(() => {
          return of(new MessageActions.SendMessageFailure('Could not send message. Please restart the client and' +
            'try again.'));
        })
      );
    }));

  @Effect()
  syncAfterSend$: Observable<Action> = this.actions$.pipe(
    ofType<SendMessageSuccess>(MessageActions.ActionTypes.SendMessageSuccess),
    withLatestFrom(this.store),
    map(([action, storeState]) => storeState.accountsInfo.currentAccount),
    switchMap(id => {
      return of(new MessageActions.SyncServerPending({id: id, limit: -1}));
    })
  );
}
