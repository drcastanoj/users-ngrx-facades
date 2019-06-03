import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../state/app.state';
import {
  selectUsersResult,
  selectCurrentPage,
  selectItemPerPage,
  selectItemsPerPageSize,
  selectPagination,
  selectSeed,
  selectLoading
} from '../selectors/users.selectors';
import { Observable } from 'rxjs';
import { IUser, IPagination } from '../../users.types';
import { filter } from 'rxjs/operators';
import { isDefinedGuard } from './type-guard';
import { SearchUsers, SelectPage, ChangePageSize } from '../actions/users.actions';


@Injectable()
export class UsersFacade {

  usersList$: Observable<IUser[]> = this.store.pipe(select(selectUsersResult), filter(isDefinedGuard));
  seed$: Observable<string> = this.store.pipe(select(selectSeed), filter(isDefinedGuard));
  pagination$: Observable<IPagination> = this.store.pipe(select(selectPagination), filter(isDefinedGuard));
  currentPage$: Observable<number> = this.store.pipe(select(selectCurrentPage), filter(isDefinedGuard));
  itemPerPage$: Observable<number> = this.store.pipe(select(selectItemPerPage), filter(isDefinedGuard));
  itemsPerPageSize$: Observable<number[]> = this.store.pipe(select(selectItemsPerPageSize), filter(isDefinedGuard));
  loading$: Observable<boolean> = this.store.pipe(select(selectLoading));

  constructor(private store: Store<AppState>) {
  }

  public selectPage(page: number) {
    this.store.dispatch(new SelectPage(page));
  }

  public searchUsers(seed: string) {
    if (seed) {
      this.store.dispatch(new SearchUsers(seed));
    }
  }

  public changePageSize(size) {
    this.store.dispatch(new ChangePageSize(size));
  }
}
