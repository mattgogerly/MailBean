import * as AccountActions from '../actions/account.actions';
import { unionBy } from 'lodash';

export const initialState = {
  accounts: [],
  currentAccount: null,
  pending: true,
  error: false
};

export function accountReducer(
  state = initialState,
  action: AccountActions.ActionsUnion
) {
  switch (action.type) {
    case AccountActions.ActionTypes.GetAccountsPending: {
      return Object.assign({}, state, {pending: true, error: false});
    }

    case AccountActions.ActionTypes.GetAccountsSuccess: {
      return Object.assign({}, state, {pending: false, accounts: unionBy(action.payload, state.accounts, 'id')});
    }

    case AccountActions.ActionTypes.GetAccountsFailure: {
      return Object.assign({}, state, {pending: false, error: true});
    }

    case AccountActions.ActionTypes.AddAccountPending: {
      return Object.assign({}, state, {pending: true, error: false});
    }

    case AccountActions.ActionTypes.AddAccountSuccess: {
      return Object.assign({}, state, {pending: false, accounts: unionBy([action.payload], state.accounts, 'id')});
    }

    case AccountActions.ActionTypes.AddAccountFailure: {
      return Object.assign({}, state, {pending: false, error: true});
    }

    case AccountActions.ActionTypes.DeleteAccountPending: {
      const newAccounts = state.accounts.filter(account => account.id !== action.payload);
      return Object.assign({}, state, {accounts: newAccounts, pending: true, error: false});
    }

    case AccountActions.ActionTypes.DeleteAccountSuccess: {
      return Object.assign({}, state, {pending: false, error: false});
    }

    case AccountActions.ActionTypes.DeleteAccountFailure: {
      return Object.assign({}, state, {pending: false, error: true});
    }

    case AccountActions.ActionTypes.SetCurrentAccountPending: {
      return Object.assign({}, state, {pending: true, error: false});
    }

    case AccountActions.ActionTypes.SetCurrentAccountSuccess: {
      return Object.assign({}, state, {currentAccount: action.payload});
    }

    case AccountActions.ActionTypes.SetCurrentAccountFailure: {
      return Object.assign({}, state, {pending: false, error: true});
    }

    default: {
      return state;
    }
  }
}
