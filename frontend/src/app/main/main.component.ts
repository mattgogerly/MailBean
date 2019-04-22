import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading = true;
  @ViewChild(MessageListComponent) child: MessageListComponent;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    // select whether we're waiting for a local response from the store
    this.store.pipe(select((state: any) => state.messages.localPending), take(2))
      .subscribe(pending => {
        // if we're not pending then change loading to false
        if (!pending) {
          setTimeout(() => this.loading = false, 500);
        }
      });
  }

  scrollMessageList() {
    // need to put this here since the HTMLElement is actually in this component
    // just calls the scroll() method on MessageListComponent
    if (this.child != null) {
      this.child.scroll();
    }
  }

}
