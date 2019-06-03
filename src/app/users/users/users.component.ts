import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { SelectPage, ChangePageSize, SearchUsers } from '../store/actions/users.actions';
import { AppState } from '../store/state/app.state';
import { selectPagination, selectUsers, selectUsersResult, selectLoading, selectSeed } from '../store/selectors/users.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  search = new FormControl();
  users;
  currentPage;
  itemsPerPage;
  itemsPerPageSize;
  seed;
  loading;

  suscriptions: Subscription[] = [];

  constructor(public store: Store<AppState>) { }

  ngOnInit() {
    this.searchUsers('batman');
    this.suscriptions.push(this.store.pipe(select(selectPagination)).subscribe(
      pagination => {
        const { itemPerPage, currentPage, itemsPerPageSizes } = pagination;
        this.itemsPerPage = itemPerPage;
        this.currentPage = currentPage;
        this.itemsPerPageSize = itemsPerPageSizes;
      }
    ));
    this.suscriptions.push(this.store.pipe(select(selectSeed)).subscribe(
      seed => {
        this.seed = seed;
      }
    ));
    this.suscriptions.push(this.store.pipe(select(selectUsersResult)).subscribe(
      users => {
        this.users = users;
      }
    ));

    this.suscriptions.push(this.store.pipe(select(selectLoading)).subscribe(
      loading => {
        this.loading = loading;
      }
    ));
    this.suscriptions.push(this.search.valueChanges.subscribe(val => {
      this.searchUsers(val);
    }));
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

  ngOnDestroy() {
    for (let suscription of this.suscriptions) {
      suscription.unsubscribe();
    }
  }

}
