import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersActionTypes } from '../actions/users.actions.types';
import { UsersService } from '../../users.service';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchUsersSuccess, SearchUsers, SelectPage, ChangePageSize } from '../actions/users.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectSeed, selectPagination } from '../selectors/users.selectors';

@Injectable()
export class UsersEffects {

  @Effect()
  searchUsers$ = this.actions$
    .pipe(
      ofType(UsersActionTypes.SearchUsers),
      withLatestFrom(this.store.pipe(select(selectPagination))),
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
      withLatestFrom(this.store.pipe(select(selectPagination))),
      withLatestFrom(this.store.pipe(select(selectSeed))),
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
      withLatestFrom(this.store.pipe(select(selectSeed))),
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
    private store: Store<AppState>) {

  }
}
