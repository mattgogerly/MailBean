import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { unionBy } from 'lodash';
import { DeleteAccountPending, GetAccountsPending, SetCurrentAccountPending } from '../redux/actions/account.actions';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabs = [
    {
      name: 'Add Account',
      provider: '+',
      id: ''
    }
  ];
  selected = new FormControl(0);

  constructor(private store: Store<any>, private router: Router) {
    this.store.select('accountsInfo')
      .subscribe(accountsInfo => {
        this.tabs = unionBy(accountsInfo.accounts, this.tabs, 'id');
      });
  }

  ngOnInit() {
    this.store.dispatch(new GetAccountsPending());
  }

  changeTab(event) {
    if (event === this.tabs.length - 1) {
      this.addAccount();
    } else {
      this.store.dispatch(new SetCurrentAccountPending(this.tabs[event].id));
      this.selected.setValue(event);
    }
  }

  closeTab(index) {
    this.store.dispatch(new DeleteAccountPending(this.tabs[index].id));
    this.tabs.splice(index, 1);

    if (this.tabs.length === 1) {
      this.router.navigate(['/auth']);
    }
  }

  addAccount() {
    this.router.navigate(['/auth'], {queryParams: {canCancel: true}});
  }

}
