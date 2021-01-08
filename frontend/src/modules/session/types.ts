import { UserData } from 'src/types/user';

// action names

export const SET_CURRENT_USER = 'user/SET_CURRENT_USER';

// action types

export interface SetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  user: UserData | null;
}

export type SessionActionTypes = SetCurrentUserAction;

// state types

export interface SessionState {
  user: UserData | null;
}
