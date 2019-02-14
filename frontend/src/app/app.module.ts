import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { MatCardModule, MatListModule } from '@angular/material';
import { GmailAuthComponent } from './auth/gmail-auth/gmail-auth.component';
import { OtherAuthComponent } from './auth/other-auth/other-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GmailAuthComponent,
    OtherAuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RoutingModule,
    MatCardModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
