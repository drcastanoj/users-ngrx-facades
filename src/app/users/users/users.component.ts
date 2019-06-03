import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersFacade } from '../store/facades/users.facade';
import { FormControl } from '@angular/forms';

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


  constructor(public facade: UsersFacade) { }

  ngOnInit() {
    this.facade.searchUsers('batman');
    this.search.valueChanges.subscribe(val => {
      this.facade.searchUsers(val);
    });
  }


  ngOnDestroy() {

  }

}
