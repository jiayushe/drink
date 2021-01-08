import { UserData } from 'src/types/user';
import * as types from './types';

export function setCurrentUser(user: UserData | null): types.SetCurrentUserAction {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}
