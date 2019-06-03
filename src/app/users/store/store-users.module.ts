import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './reducers/users.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/users.effects';
import { UsersService } from '../users.service';

@NgModule({
  declarations: [],
  providers: [
    UsersService
  ],
  imports: [
    CommonModule,
    StoreModule.forRoot({ users: usersReducer }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      UsersEffects
    ]),
  ]
})
export class StoreUsersModule { }
