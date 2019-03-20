import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { unionBy } from 'lodash';
import { FormControl } from '@angular/forms';
import { GetAccountsPending } from '../redux/actions/account.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  tabs = [];
  selected = new FormControl(0);

  constructor(private store: Store<any>) {
    this.store.select('accountsInfo')
      .subscribe(accountsInfo => {
        this.tabs = unionBy(accountsInfo.accounts, this.tabs, 'id');
      });
  }

  ngOnInit() {
    this.store.dispatch(new GetAccountsPending());
  }

}
