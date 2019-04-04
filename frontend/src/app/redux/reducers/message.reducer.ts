import * as MessageActions from '../actions/message.actions';
import { unionBy } from 'lodash';
import { Folder } from '../models/folder';

export const initialState: any = {
  folders: [],
  messages: [],
  currentFolder: 'Inbox',
  currentMessage: '',
  composing: false,
  refreshRequired: false,
  localPending: false,
  localError: false,
  serverPending: false,
  serverError: false
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
        folders: sortFolders(action.payload.folders),
        messages: action.payload.messages
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

    case MessageActions.ActionTypes.ReadMessagePending: {
      let currentMessage = null;
      const messages = state.messages.map(m => {
        if (m.uid === action.payload.uid) {
          currentMessage = {...m, seen: true};
          return currentMessage;
        }

        return m;
      });

      let folder = null;
      const folders = state.folders.map(f => {
        if (f.name === action.payload.folder.name) {
          folder = {...f, unread: f.unread - 1};
          return folder;
        }

        return f;
      });

      return Object.assign({}, state, {messages: messages, folders: folders, currentMessage: currentMessage});
    }

    case MessageActions.ActionTypes.ToggleComposing: {
      return Object.assign({}, state, {composing: action.payload});
    }

    case MessageActions.ActionTypes.DeleteMessagePending: {
      const index = state.messages.findIndex(m =>  {
        if (m.uid === action.payload.uid) {
          folder = m.folder.name;
          return m;
        }
      });
      const newMessagesArr = state.messages.filter(m => m.uid !== action.payload.uid);

      const folderMessages = newMessagesArr.filter(m => m.folder.name === folder);
      let newCurrentMessage;
      if (folderMessages.length === 0) {
        newCurrentMessage = {};
      } else if (index >= folderMessages.length) {
        newCurrentMessage = folderMessages[folderMessages.length - 1];
      } else {
        newCurrentMessage = folderMessages[index];
      }

      let folder = null;
      const folders = state.folders.map(f => {
        if (f.name === action.payload.folder.name && action.payload.seen === false) {
          folder = {...f, unread: f.unread - 1};
          return folder;
        }

        return f;
      });

      return Object.assign({}, state, {messages: newMessagesArr, folders: folders, currentMessage: newCurrentMessage.uid});
    }

    default: {
      return state;
    }
  }
}

function sortFolders(folders: Folder[]) {
  const order = [ '[gmail]/bin', 'deleted', 'trash', '[gmail]/sent mail', 'sent', '[gmail]/drafts', 'drafts', 'junk',
    '[gmail]/spam', 'spam', 'inbox', '[gmail]/all mail' ];

  return folders.sort(((a, b) => {
    return order.indexOf(b.name.toLowerCase()) - order.indexOf(a.name.toLowerCase());
  }));
}
