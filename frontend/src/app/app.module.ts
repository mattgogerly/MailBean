import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { setAppInjector } from './app-injector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountStoreModule } from './redux/modules/account-store.module';
import { MessageStoreModule } from './redux/modules/message-store.module';

import { TruncatePipe } from './utils/truncate-pipe';
import { StripHtmlPipe } from './utils/strip-html-pipe';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';
import { AuthComponent } from './auth/auth.component';
import { GmailAuthComponent } from './auth/gmail-auth/gmail-auth.component';
import { OtherAuthComponent } from './auth/other-auth/other-auth.component';

import { MatCardModule, MatListModule, MatProgressSpinnerModule, MatFormFieldModule, MatButtonModule,
  MatInputModule, MatTabsModule, MatBadgeModule, MatChipsModule } from '@angular/material';

@NgModule({
  declarations: [
    TruncatePipe,
    StripHtmlPipe,
    AppComponent,
    AuthComponent,
    GmailAuthComponent,
    OtherAuthComponent,
    TabsComponent,
    MainComponent,
    SidebarComponent,
    MessageListComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    AccountStoreModule,
    MessageStoreModule,
    FormsModule,
    FlexLayoutModule,
    RoutingModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
