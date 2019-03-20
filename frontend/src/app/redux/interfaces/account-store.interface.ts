export interface AccountStore {
  accounts: Account[];
  currentAccount: string;
  pending: boolean;
  error: boolean;
}
