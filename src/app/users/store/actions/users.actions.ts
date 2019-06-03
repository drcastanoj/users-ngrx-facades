import { UsersActionTypes } from './users.actions.types';
import { IUser, ISearchUser } from '../../users.types';
import { Action } from '@ngrx/store';

class ActionBase implements Action {
  constructor(readonly type: string) { }
}


export class SearchUsers extends ActionBase {
  constructor(public payload: string) {
    super(UsersActionTypes.SearchUsers);
  }
}

export class SearchUsersSuccess extends ActionBase {
  constructor(public payload: ISearchUser) {
    super(UsersActionTypes.SearchUsersSuccess);
  }
}

export class SelectPage extends ActionBase {
  constructor(readonly payload: number) {
    super(UsersActionTypes.SelectPage);
  }
}

export class ChangePageSize extends ActionBase {
  constructor(readonly payload: number) {
    super(UsersActionTypes.ChangePageSize);
  }
}



export type UsersActions =
  | SearchUsersSuccess
  | SearchUsers;
