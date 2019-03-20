import * as MessageActions from '../actions/message.actions';
import { unionBy } from 'lodash';
import { Folder } from '../models/folder';
import { DetailedMessage } from '../models/detailed-message';

export const initialState = {
  folders: [],
  messages: [],
  currentFolder: 'Inbox',
  currentMessage: new DetailedMessage()
};

export function messageReducer(
  state = initialState,
  action: MessageActions.ActionsUnion
) {
  switch (action.type) {
    case MessageActions.ActionTypes.GetLocalPending: {
      return Object.assign({}, state, {localPending: true, localError: false});
    }

    case MessageActions.ActionTypes.GetLocalSuccess: {
      return Object.assign({}, state, {
        localPending: false,
        localError: false,
        folders: sortFolders(unionBy(action.payload.folders, state.folders, 'name')),
        messages: unionBy(action.payload.messages, state.messages, 'uid')
      });
    }

    case MessageActions.ActionTypes.GetLocalFailure: {
      return Object.assign({}, state, {localPending: false, localError: true});
    }

    case MessageActions.ActionTypes.SyncServerPending: {
      return Object.assign({}, state, {serverPending: true, serverError: false});
    }

    case MessageActions.ActionTypes.SyncServerSuccess: {
      return Object.assign({}, state, {serverPending: false, serverError: false});
    }

    case MessageActions.ActionTypes.SyncServerFailure: {
      return Object.assign({}, state, {serverPending: false, serverError: true});
    }

    case MessageActions.ActionTypes.ChangeActiveFolder: {
      return Object.assign({}, state, {currentFolder: action.payload});
    }

    case MessageActions.ActionTypes.ChangeActiveMessage: {
      return Object.assign({}, state, {currentMessage: action.payload});
    }

    default: {
      return state;
    }
  }
}

function sortFolders(folders: Folder[]) {
  const order = [ 'sent', 'junk', 'spam', 'inbox' ];

  return folders.sort(((a, b) => {
    return order.indexOf(b.name.toLowerCase()) - order.indexOf(a.name.toLowerCase());
  }));
}
