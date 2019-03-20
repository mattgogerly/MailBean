import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DetailedMessage } from '../redux/models/detailed-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild('message') dataContainer: ElementRef;
  message: DetailedMessage = new DetailedMessage();

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(select((state: any) => state.messages.currentMessage))
      .subscribe(message => {
        this.message = message;
        this.loadHtml();
      });
  }

  loadHtml() {
    if (this.message.content === undefined) {
      this.message.content = '';
    }

    this.dataContainer.nativeElement.innerHTML = this.message.content;
  }

}
