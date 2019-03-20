import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { accountReducer } from '../reducers/account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from '../effects/account.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('accountsInfo', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
})
export class AccountStoreModule {}
