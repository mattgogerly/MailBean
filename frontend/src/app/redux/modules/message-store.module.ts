import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { messageReducer } from '../reducers/message.reducer';
import { MessageEffects } from '../effects/message.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('messages', messageReducer),
    EffectsModule.forFeature([MessageEffects])
  ],
})
export class MessageStoreModule {}
