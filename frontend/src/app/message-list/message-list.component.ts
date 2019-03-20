import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DetailedMessage } from '../redux/models/detailed-message';
import { ChangeActiveMessage } from '../redux/actions/message.actions';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  currentFolder: string;
  messages: DetailedMessage[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(select((state: any) => state.messages))
      .subscribe(messageState => {
        this.currentFolder = messageState.currentFolder;
        this.messages = messageState.messages.filter(message => message.folder.name === this.currentFolder);
      });
  }

  selectMessage(message: DetailedMessage) {
    this.store.dispatch(new ChangeActiveMessage(message));
  }

}
