import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GmailAuthComponent } from './auth/gmail-auth/gmail-auth.component';
import { OtherAuthComponent } from './auth/other-auth/other-auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'auth/google', component: GmailAuthComponent},
  {path: 'auth/other', component: OtherAuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
