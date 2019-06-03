import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StoreUsersModule } from './store/store-users.module';
import { UsersService } from './users.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UsersFacade } from './store/facades/users.facade';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [{
  path: '', component: UsersComponent
}];


@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  providers: [
    UsersService,
    UsersFacade,
  ],
  imports: [
    CommonModule,
    StoreUsersModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,

  ]
})
export class UsersModule { }
