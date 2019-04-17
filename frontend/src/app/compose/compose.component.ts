import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatChipInputEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { SendMessagePending, ToggleComposing } from '../redux/actions/message.actions';
import { NewMessageInfo } from '../redux/models/new-message-info';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent implements OnInit {

  @Input() to: string[];
  @Input() cc: string[];
  bcc: string[] = [];
  @Input() subject: string;
  @Input() content: string;
  @Input() reply: boolean;
  @Input() replyAll: boolean;
  @Input() replyTo: number;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public editor = ClassicEditor;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.content = '<br /><hr><br />' + this.content;
  }

  add(event: MatChipInputEvent, type: string) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (type === 'to') {
        this.to.push(value.trim());
      } else if (type === 'cc') {
        this.cc.push(value.trim());
      } else if (type === 'bcc') {
        this.bcc.push(value.trim());
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(recipient: string, type: string) {
    if (type === 'to') {
      const index = this.to.indexOf(recipient);

      if (index >= 0) {
        this.to.splice(index, 1);
      }
    } else if (type === 'cc') {
      const index = this.cc.indexOf(recipient);

      if (index >= 0) {
        this.cc.splice(index, 1);
      }
    } else if (type === 'bcc') {
      const index = this.bcc.indexOf(recipient);

      if (index >= 0) {
        this.bcc.splice(index, 1);
      }
    }
  }

  sendMessage() {
    const info = new NewMessageInfo();
    info.to = this.to;
    info.cc = this.cc;
    info.bcc = this.bcc;
    info.subject = this.subject;
    info.content = this.content;
    info.reply = this.reply;
    info.replyAll = this.replyAll;
    info.replyTo = this.replyTo;

    this.store.dispatch(new SendMessagePending(info));
    this.reset();
  }

  reset() {
    this.store.dispatch(new ToggleComposing(false));
    this.to = [];
    this.subject = '';
    this.content = '';
  }

}
