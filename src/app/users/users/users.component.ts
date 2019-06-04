import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersFacade } from '../store/facades/users.facade';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  search = new FormControl();
  users$ = this.facade.usersList$;
  currentPage$ = this.facade.currentPage$;
  itemsPerPage$ = this.facade.itemPerPage$;
  itemsPerPageSize$ = this.facade.itemsPerPageSize$;
  seed$ = this.facade.seed$;
  loading$ = this.facade.loading$;
  suscriptions: Subscription[] = [];

  constructor(public facade: UsersFacade) { }

  ngOnInit() {
    this.facade.searchUsers('batman');
    this.suscriptions.push(this.search.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(val => {
      this.facade.searchUsers(val);
    }));
  }


  ngOnDestroy() {
    for (const suscription of this.suscriptions) {
      suscription.unsubscribe();
    }
  }

}
