import { AppState } from 'src/types';

export function getNotifications(state: AppState) {
  return state.notifications.notifications;
}
