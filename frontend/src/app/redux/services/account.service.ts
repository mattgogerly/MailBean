import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AccountHandler } from '../../auth/utils/AccountHandler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  getAccounts() {
    return this.httpClient.get<Account[]>(environment.localApi + '/accounts');
  }

  addAccount(account: Account) {
    return this.httpClient.post<Account>(environment.localApi + '/accounts', account);
  }

  deleteAccount(id: string) {
    return this.httpClient.delete(environment.localApi + '/accounts/' + id);
  }

  setCurrentAccount(id: string) {
    const password = AccountHandler.getPasswordFromManager(id);
    const body = {password: password};
    return this.httpClient.post(environment.localApi + '/accounts/' + id, body);
  }

}
