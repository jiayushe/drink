import { AppState } from 'src/types';
import { UserData } from 'src/types/user';

function getLocalState(state: AppState) {
  return state.session;
}

export function getCurrentUser(state: AppState): UserData | null {
  return getLocalState(state).user;
}

export function isLoggedIn(state: AppState): boolean {
  return !!getCurrentUser(state);
}
