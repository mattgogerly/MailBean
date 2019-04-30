import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DetailedMessage } from '../redux/models/detailed-message';
import { ChangeActiveMessage, DeleteMessagePending, ToggleComposing } from '../redux/actions/message.actions';
import { WebAddressToEmailPipe } from '../utils/web-address-to-email.pipe';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  message: DetailedMessage;
  from: string;
  to: string[] = [];
  cc: string[] = [];
  display = false;
  originatedHere = false;

  composing = false;
  reply = false;
  replyAll = false;
  replyTo: string[] = [];
  replyCc: string[] = [];
  replySubject = '';
  replyContent = '';

  constructor(private store: Store<any>, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // select message state from store
    this.store.pipe(select((state: any) => state.messages))
      .subscribe(messageState => {
        // if there are messages then find the current message
        if (messageState.messages.length > 0) {
          this.message = messageState.messages.find(m => m.id.uid === messageState.currentMessage);
        } else {
          this.message = undefined;
        }

        // if we have a current message
        if (this.message !== undefined) {
          // format the addresses nicely
          this.from = WebAddressToEmailPipe.prototype.transform(this.message.sender);
          this.to = this.message.to.map(m => WebAddressToEmailPipe.prototype.transform(m));
          this.cc = this.message.cc.map(m => WebAddressToEmailPipe.prototype.transform(m));
          this.display = true;
        } else {
          // no message so don't display
          this.display = false;
        }
      });

    // get whether we're composing from the store
    this.store.pipe(select((state: any) => state.messages.composing))
      .subscribe(toggle => {
        // if new message button was clicked
        if (!this.originatedHere) {
          // clear the inputs
          this.replyTo = [];
          this.replyCc = [];
          this.replySubject = '';
          this.replyContent = '';
          this.composing = toggle;

          this.changeDetector.detectChanges();
        }

        // otherwise it originated somewhere else (e.g. reply button)
        this.originatedHere = false;
      });
  }

  openComposer(type: string) {
    // set state as composing
    this.store.dispatch(new ToggleComposing(true));

    // set inputs as required
    switch (type) {
      case 'reply':
        this.reply = true;
        this.replyAll = false;
        this.replyTo = [this.message.sender];
        this.replyCc = this.message.cc;
        this.replySubject = 'Re: ' + this.message.subject;
        this.replyContent = this.message.content;
        break;
      case 'forward':
        this.reply = false;
        this.replyAll = false;
        this.replyTo = [];
        this.replyCc = this.message.cc;
        this.replySubject = 'Fwd: ' + this.message.subject;
        this.replyContent = this.message.content;
        break;
      default:
        this.reply = false;
        this.replyAll = false;
        this.replyTo = [];
        this.replyCc = [];
        this.replySubject = '';
        this.replyContent = '';
        break;
    }
  }

  deleteMessage() {
    // delete message and set current message to undefined
    this.store.dispatch(new DeleteMessagePending(this.message));
    this.store.dispatch(new ChangeActiveMessage(undefined));
    this.message = undefined;
  }

}
