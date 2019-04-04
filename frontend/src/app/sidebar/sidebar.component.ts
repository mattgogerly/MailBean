import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChangeActiveFolder } from '../redux/actions/message.actions';
import { Folder } from '../redux/models/folder';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private store: Store<any>) { }

  currentFolder: string;
  folders: Folder[];

  ngOnInit() {
    this.store.pipe(select((state: any) => state.messages.folders))
      .subscribe(folders => {
        this.folders = folders;
      });

    this.store.pipe(select((state: any) => state.messages.currentFolder))
      .subscribe(folder => {
        this.currentFolder = folder;
      });
  }

  changeFolder(folder) {
    this.store.dispatch(new ChangeActiveFolder(folder.name));
  }

}
