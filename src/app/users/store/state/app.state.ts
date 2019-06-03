import { IUser, IPagination } from '../../users.types';




export interface UsersState {

  usersResult: IUser[];
  users: {
    [id: string]: IUser
  };
  seed: string;
  pagination: IPagination;
  loading: boolean;
}

export const INITIAL_USERS_STATE: UsersState = {
  usersResult: [],
  users: {},
  seed: '',
  loading: false,
  pagination: {
    currentPage: 1,
    itemPerPage: 5,
    itemsPerPageSizes: [5, 10, 15]
  }
};

export interface AppState {
  users: UsersState;
}

export const INITIAL_APPP_STATE: AppState = {
  users: INITIAL_USERS_STATE
};
