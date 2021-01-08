export interface Notification {
  key: number;
  content: string;
  variant: NotificationVariant;
}

export type NotificationVariant = 'default' | 'error' | 'success' | 'warning' | 'info';
