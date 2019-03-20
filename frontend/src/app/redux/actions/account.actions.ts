import { Action } from '@ngrx/store';
import { Account } from '../models/account';

export enum ActionTypes {
  GetAccountsPending = '[Accounts] Get Accounts Pending',
  GetAccountsSuccess = '[Accounts] Get Accounts Success',
  GetAccountsFailure = '[Accounts] Get Accounts Failure',
  AddAccountPending = '[Accounts] Add Account Pending',
  AddAccountSuccess = '[Accounts] Add Account Success',
  AddAccountFailure = '[Accounts] Add Account Failure',
  DeleteAccountPending = '[Accounts] Delete Account Pending',
  DeleteAccountSuccess = '[Accounts] Delete Account Success',
  DeleteAccountFailure = '[Accounts] Delete Account Failure',
  SetCurrentAccountPending = '[Accounts] Set Current Account Pending',
  SetCurrentAccountSuccess = '[Accounts] Set Current Account Success',
  SetCurrentAccountFailure = '[Accounts] Set Current Account Failure'
}

export class GetAccountsPending implements Action {
  readonly type = ActionTypes.GetAccountsPending;
  constructor(public payload: any = null) { }
}

export class GetAccountsSuccess implements Action {
  readonly type = ActionTypes.GetAccountsSuccess;
  constructor(public payload: Account[]) {}
}

export class GetAccountsFailure implements Action {
  readonly type = ActionTypes.GetAccountsFailure;
  constructor(public payload: any = null) { }
}

export class AddAccountPending implements Action {
  readonly type = ActionTypes.AddAccountPending;
  constructor(public payload: Account = null) { }
}

export class AddAccountSuccess implements Action {
  readonly type = ActionTypes.AddAccountSuccess;
  constructor(public payload: Account) {}
}

export class AddAccountFailure implements Action {
  readonly type = ActionTypes.AddAccountFailure;
  constructor(public payload: any = null) { }
}

export class DeleteAccountPending implements Action {
  readonly type = ActionTypes.DeleteAccountPending;
  constructor(public payload: string = null) { }
}

export class DeleteAccountSuccess implements Action {
  readonly type = ActionTypes.DeleteAccountSuccess;
  constructor(public payload: string = null) {}
}

export class DeleteAccountFailure implements Action {
  readonly type = ActionTypes.DeleteAccountFailure;
  constructor(public payload: any = null) { }
}

export class SetCurrentAccountPending implements Action {
  readonly type = ActionTypes.SetCurrentAccountPending;
  constructor(public payload: string) {}
}

export class SetCurrentAccountSuccess implements Action {
  readonly type = ActionTypes.SetCurrentAccountSuccess;
  constructor(public payload: string) {}
}

export class SetCurrentAccountFailure implements Action {
  readonly type = ActionTypes.SetCurrentAccountFailure;
  constructor(public payload: any = null) {}
}

export type ActionsUnion = GetAccountsPending | GetAccountsSuccess | GetAccountsFailure | AddAccountPending |
  AddAccountSuccess | AddAccountFailure | DeleteAccountPending | DeleteAccountSuccess | DeleteAccountFailure |
  SetCurrentAccountPending | SetCurrentAccountSuccess | SetCurrentAccountFailure;
