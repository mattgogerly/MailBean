import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalResponse } from '../models/local-response';
import { DetailedMessage } from '../models/detailed-message';
import { NewMessageInfo } from '../models/new-message-info';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  syncWithServer(id: string, limit: number) {
    if (limit < 0) {
      // sync existing messages
      return this.httpClient.get<boolean>(environment.localApi + '/imap/' + id + '/server');
    } else {
      return this.httpClient.get<boolean>(environment.localApi + '/imap/' + id + '/server/' + limit);
    }
  }

  getLocal(id: string) {
    return this.httpClient.get<LocalResponse>(environment.localApi + '/imap/' + id);
  }

  delete(id: string, msg: DetailedMessage) {
    return this.httpClient.delete<boolean>(environment.localApi + '/imap/' + id + '/' + msg.uid + '/delete');
  }

  markRead(id: string, msg: DetailedMessage) {
    return this.httpClient.put<boolean>(environment.localApi + '/imap/' + id + '/' + msg.uid + '/read', {});
  }

  sendMessage(id: string, info: NewMessageInfo) {
    return this.httpClient.post<boolean>(environment.localApi + '/smtp/' + id, info);
  }

}
