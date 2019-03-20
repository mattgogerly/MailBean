import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { LocalResponse } from '../models/local-response';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient, private store: Store<any>) { }

  syncWithServer(id: string) {
    return this.httpClient.get<boolean>(environment.localApi + '/imap/' + id + '/server');
  }

  getLocal(id: string) {
    return this.httpClient.get<LocalResponse>(environment.localApi + '/imap/' + id);
  }

}
