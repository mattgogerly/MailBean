import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { setAppInjector } from './app-injector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { MatCardModule, MatListModule, MatProgressSpinnerModule, MatFormFieldModule, MatButtonModule,
  MatInputModule } from '@angular/material';
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
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    RoutingModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
