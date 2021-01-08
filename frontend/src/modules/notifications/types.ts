import { Notification } from './../../types/notifications';

// action names

export const ENQUEUE_NOTIFICATION = 'notifications/ENQUEUE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'notifications/REMOVE_NOTIFICATION';

// action types

export interface EnqueueNotificationAction {
  type: typeof ENQUEUE_NOTIFICATION;
  notification: Notification;
}

export interface RemoveNotificationAction {
  type: typeof REMOVE_NOTIFICATION;
  key: number;
}

export type NotificationActionTypes = EnqueueNotificationAction | RemoveNotificationAction;

// state types

export interface NotificationsState {
  notifications: Notification[];
}
