import produce from 'immer';

import * as types from './types';

const initialState: types.NotificationsState = {
  notifications: [
    {
      key: 0,
      content: 'Welcome to APPNAME!',
      variant: 'success'
    }
  ]
};

const notificationsReducer = produce((draft: types.NotificationsState, action: types.NotificationActionTypes) => {
  switch (action.type) {
    case types.ENQUEUE_NOTIFICATION:
      draft.notifications.push(action.notification);
      return;

    case types.REMOVE_NOTIFICATION:
      draft.notifications = draft.notifications.filter((notification) => notification.key !== action.key);
      return;
  }
}, initialState);

export default notificationsReducer;
