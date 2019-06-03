import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersActionTypes } from '../actions/users.actions.types';
import { UsersService } from '../../users.service';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchUsersSuccess, SearchUsers, SelectPage, ChangePageSize } from '../actions/users.actions';
import { UsersFacade } from '../facades/users.facade';

@Injectable()
export class UsersEffects {

  @Effect()
  searchUsers$ = this.actions$
    .pipe(
      ofType(UsersActionTypes.SearchUsers),
      withLatestFrom(this.facade.pagination$),
      mergeMap(([action, pagination]) => this.usersService.searchUsers((action as SearchUsers).payload, 1, pagination.itemPerPage)
        .pipe(
          map(result => new SearchUsersSuccess(result),
            catchError(() => EMPTY)
          ))
      )
    );


  @Effect()
  selectPage$ = this.actions$
    .pipe(
      ofType(UsersActionTypes.SelectPage),
      withLatestFrom(this.facade.pagination$),
      withLatestFrom(this.facade.seed$),
      mergeMap(([[action, pagination], seed]) => this.usersService.searchUsers(
        seed, (action as SelectPage).payload, pagination.itemPerPage)
        .pipe(
          map(result => new SearchUsersSuccess(result),
            catchError(() => EMPTY)
          ))
      )
    );

  @Effect()
  prevPage$ = this.actions$
    .pipe(
      ofType(UsersActionTypes.ChangePageSize),
      withLatestFrom(this.facade.seed$),
      mergeMap(([action, seed]) => this.usersService.searchUsers(
        seed, 1, (action as ChangePageSize).payload)
        .pipe(
          map(result => new SearchUsersSuccess(result),
            catchError(() => EMPTY)
          ))
      )
    );

  constructor(private usersService: UsersService,
    private actions$: Actions,
    private facade: UsersFacade) {

  }
}
