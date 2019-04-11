import { Action } from '@ngrx/store';
import { LocalResponse } from '../models/local-response';
import { DetailedMessage } from '../models/detailed-message';
import {NewMessageInfo} from "../models/new-message-info";

export enum ActionTypes {
  GetLocalPending = '[Messages] Get Local Pending',
  GetLocalSuccess = '[Messages] Get Local Success',
  GetLocalFailure = '[Messages] Get Local Failure',
  SyncServerPending = '[Messages] Sync Server Pending',
  SyncServerSuccess = '[Messages] Sync Server Success',
  SyncServerFailure = '[Messages] Sync Server Failure',
  ChangeActiveFolder = '[Messages] Change Active Folder',
  ChangeActiveMessage = '[Messages] Change Active Message',
  DeleteMessagePending = '[Message] Delete Message Pending',
  DeleteMessageSuccess = '[Message] Delete Message Success',
  DeleteMessageFailure = '[Message] Delete Message Failure',
  ReadMessagePending = '[Message] Read Message Pending',
  ReadMessageSuccess = '[Message] Read Message Success',
  ReadMessageFailure = '[Message] Read Message Failure',
  ToggleComposing = '[Message] Toggle Composing',
  SendMessagePending = '[Message] Send Message Pending',
  SendMessageSuccess = '[Message] Send Message Success',
  SendMessageFailure = '[Message] Send Message Failure'
}

export class GetLocalPending implements Action {
  readonly type = ActionTypes.GetLocalPending;
  constructor(public payload: any) { }
}

export class GetLocalSuccess implements Action {
  readonly type = ActionTypes.GetLocalSuccess;
  constructor(public payload: LocalResponse) {}
}

export class GetLocalFailure implements Action {
  readonly type = ActionTypes.GetLocalFailure;
  constructor(public payload: string) {}
}

export class SyncServerPending implements Action {
  readonly type = ActionTypes.SyncServerPending;
  constructor(public payload: any) { }
}

export class SyncServerSuccess implements Action {
  readonly type = ActionTypes.SyncServerSuccess;
  constructor() {}
}

export class SyncServerFailure implements Action {
  readonly type = ActionTypes.SyncServerFailure;
  constructor(public payload: string) {}
}

export class ChangeActiveFolder implements Action {
  readonly type = ActionTypes.ChangeActiveFolder;
  constructor(public payload: string) {}
}

export class ChangeActiveMessage implements Action {
  readonly type = ActionTypes.ChangeActiveMessage;
  constructor(public payload: number) {}
}

export class DeleteMessagePending implements Action {
  readonly type = ActionTypes.DeleteMessagePending;
  constructor(public payload: DetailedMessage) { }
}

export class DeleteMessageSuccess implements Action {
  readonly type = ActionTypes.DeleteMessageSuccess;
  constructor() {}
}

export class DeleteMessageFailure implements Action {
  readonly type = ActionTypes.DeleteMessageFailure;
  constructor(public payload: string) {}
}

export class ReadMessagePending implements Action {
  readonly type = ActionTypes.ReadMessagePending;
  constructor(public payload: DetailedMessage) { }
}

export class ReadMessageSuccess implements Action {
  readonly type = ActionTypes.ReadMessageSuccess;
  constructor() {}
}

export class ReadMessageFailure implements Action {
  readonly type = ActionTypes.ReadMessageFailure;
  constructor(public payload: string) {}
}

export class ToggleComposing implements Action {
  readonly type = ActionTypes.ToggleComposing;
  constructor(public payload: boolean) {}
}

export class SendMessagePending implements Action {
  readonly type = ActionTypes.SendMessagePending;
  constructor(public payload: NewMessageInfo) {}
}

export class SendMessageSuccess implements Action {
  readonly type = ActionTypes.SendMessageSuccess;
  constructor() {}
}

export class SendMessageFailure implements Action {
  readonly type = ActionTypes.SendMessageFailure;
  constructor(public payload: string) {}
}

export type ActionsUnion = GetLocalPending | GetLocalSuccess | GetLocalFailure | SyncServerPending | SyncServerSuccess |
  SyncServerFailure | ChangeActiveFolder | ChangeActiveMessage | DeleteMessagePending | DeleteMessageSuccess |
  DeleteMessageFailure | ReadMessagePending | ReadMessageSuccess | ReadMessageFailure | ToggleComposing |
  SendMessagePending | SendMessageSuccess | SendMessageFailure;
