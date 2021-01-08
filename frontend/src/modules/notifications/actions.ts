import { NotificationVariant } from './../../types/notifications';
import * as types from './types';

/**
 * Returns an action that enqueues a new notification to be displayed.
 * @param content The text displayed on the notification.
 * @param variant The variant of the notification.
 */
export function enqueueNotification(content: string, variant: NotificationVariant): types.EnqueueNotificationAction {
  return {
    type: types.ENQUEUE_NOTIFICATION,
    notification: {
      key: new Date().getTime() + Math.random(),
      content,
      variant
    }
  };
}

/**
 * Returns an action that removes an enqueued notification.
 * @param key The key identifying the notification to be removed.
 */
export function removeNotification(key: number): types.RemoveNotificationAction {
  return {
    type: types.REMOVE_NOTIFICATION,
    key
  };
}
