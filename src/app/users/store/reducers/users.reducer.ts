import { INITIAL_USERS_STATE, UsersState } from '../state/app.state';
import { UsersActions } from '../actions/users.actions';
import { UsersActionTypes } from '../actions/users.actions.types';
import { IUser } from '../../users.types';


export function usersReducer(
  state = INITIAL_USERS_STATE,
  action: any
): UsersState {
  switch (action.type) {
    case UsersActionTypes.SearchUsers:
      return {
        ...state,
        loading: true
      };
    case UsersActionTypes.SelectPage:
      return {
        ...state,
        loading: true
      };
    case UsersActionTypes.ChangePageSize:
      return {
        ...state,
        loading: true
      };
    case UsersActionTypes.SearchUsersSuccess:
      const { results, info } = action.payload;
      return {
        ...state,
        usersResult: results,
        seed: info.seed,
        pagination: {
          ...state.pagination,
          currentPage: info.page,
          itemPerPage: info.results
        },
        loading: false
      };
    default:
      return state;

  }
}
