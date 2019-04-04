import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading = true;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(select((state: any) => state.messages.localPending), take(2))
      .subscribe(pending => {
        if (!pending) {
          setTimeout(() => this.loading = false, 500);
        }
      });
  }

}
