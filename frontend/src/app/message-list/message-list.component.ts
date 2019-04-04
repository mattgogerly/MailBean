import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DetailedMessage } from '../redux/models/detailed-message';
import { ChangeActiveMessage, DeleteMessagePending, ReadMessagePending, SyncServerPending,
  ToggleComposing } from '../redux/actions/message.actions';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  currentFolder: string;
  currentMessage: DetailedMessage;
  messages: DetailedMessage[] = [];
  currentAccount: string;
  refreshing = true;

  private offset = false;
  private hasFocus = false;

  constructor(private store: Store<any>, private eRef: ElementRef) { }

  ngOnInit() {
    this.store.pipe(select((state: any) => state.messages))
      .subscribe(messageState => {
        this.currentFolder = messageState.currentFolder;
        this.messages = messageState.messages
          .filter(message => message.folder.name.toLowerCase() === this.currentFolder.toLowerCase())
          .sort((a, b) => {
            return b.received - a.received;
          });
        this.currentMessage = messageState.messages.find(m => m.uid === messageState.currentMessage);
        this.refreshing = messageState.serverPending || messageState.localPending;
      });

    this.store.pipe(select((state: any) => state.accountsInfo.currentAccount))
      .subscribe(currentAccount => {
        this.currentAccount = currentAccount;
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.hasFocus) {
      event.preventDefault();

      switch (event.key) {
        case 'Delete':
          this.delete(this.currentMessage);
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowUp':
          this.moveUp();
          break;
        default:
          break;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  click() {
    this.hasFocus = this.eRef.nativeElement.contains(event.target);
  }

  selectMessage(message: DetailedMessage) {
    if (!message.seen) {
      this.store.dispatch(new ReadMessagePending(message));
    }

    this.store.dispatch(new ChangeActiveMessage(message.uid));
  }

  refresh() {
    this.store.dispatch(new SyncServerPending({id: this.currentAccount}));
    this.refreshing = true;
  }

  compose() {
    this.store.dispatch(new ToggleComposing(true));
  }

  delete(message: DetailedMessage) {
    this.store.dispatch(new DeleteMessagePending(this.currentMessage));

    if (message.uid === this.currentMessage.uid) {
      if (this.messages.length !== 1) {
        this.moveDown();
      } else {
        this.store.dispatch(new ChangeActiveMessage(null));
      }
    }
  }

  moveDown() {
    const currentIndex = this.messages.findIndex(m => m.uid === this.currentMessage.uid);
    const newIndex = currentIndex + 1;

    if (newIndex > this.messages.length - 1) {
      return;
    }

    this.selectMessage(this.messages[newIndex]);

    const container = document.querySelector('.message-list');
    const selected = <HTMLElement> document.querySelector('.selected');
    if (selected.offsetTop >= (container.clientHeight - 80)) {
      if (!this.offset) {
        container.scrollTop += 80;
        this.offset = true;
      }

      container.scrollTop += selected.offsetHeight;
    }
  }

  moveUp() {
    const currentIndex = this.messages.findIndex(m => m.uid === this.currentMessage.uid);
    const newIndex = currentIndex - 1;

    if (newIndex < 0) {
      return;
    }

    this.selectMessage(this.messages[newIndex]);

    const container = document.querySelector('.message-list');
    const selected = <HTMLElement> document.querySelector('.selected');
    if (selected.offsetTop <= (container.clientHeight + 80)) {
      if (this.offset) {
        container.scrollTop -= 80;
        this.offset = false;
      }
    }

    container.scrollTop -= selected.offsetHeight;
  }
}
