import { createSelector } from '@ngrx/store';
import { AppState, UsersState } from '../state/app.state';
import { IPagination } from '../../users.types';

export const selectUsersState = (state: AppState) => state.users;

export const selectUsersResult = createSelector(
  selectUsersState,
  (state: UsersState) => state && state.usersResult
);

export const selectUsers = createSelector(
  selectUsersState,
  (stateUsers: UsersState) => stateUsers.users
);

export const selectLoading = createSelector(
  selectUsersState,
  (stateUsers: UsersState) => stateUsers.loading
);

export const selectSeed = createSelector(
  selectUsersState,
  (stateUsers: UsersState) => stateUsers.seed
);

export const selectPagination = createSelector(
  selectUsersState,
  (stateUsers: UsersState) => stateUsers.pagination
);

export const selectCurrentPage = createSelector(
  selectPagination,
  (pagination: IPagination) => pagination.currentPage
);

export const selectItemPerPage = createSelector(
  selectPagination,
  (pagination: IPagination) => pagination.itemPerPage
);

export const selectItemsPerPageSize = createSelector(
  selectPagination,
  (pagination: IPagination) => pagination.itemsPerPageSizes
);

export const selectUser = (id) => createSelector(
  selectUsers,
  (users) => users[id]
);
