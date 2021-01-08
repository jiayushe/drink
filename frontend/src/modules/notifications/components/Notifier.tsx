import { useSnackbar } from 'notistack';
import * as React from 'react';
import { connect } from 'react-redux';

import { ThunkDispatchProps } from 'src/types';
import { Notification } from 'src/types/notifications';
import { removeNotification } from '../actions';
import { getNotifications } from '../selectors';

interface StateProps {
  notifications: Notification[];
}

type Props = StateProps & ThunkDispatchProps;

const Notifier: React.FC<Props> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [displayedKeys, setDisplayedKeys] = React.useState<number[]>([]);

  React.useEffect(() => {
    // remove old cached display keys
    const newDisplayKeys = displayedKeys.filter((key) =>
      props.notifications.find((notification) => notification.key === key)
    );

    let hasKeysChanged = newDisplayKeys.length !== displayedKeys.length;

    // display all new notifications
    props.notifications.forEach((notification) => {
      if (displayedKeys.indexOf(notification.key) >= 0) {
        return;
      }

      enqueueSnackbar(notification.content, {
        variant: notification.variant
      });

      newDisplayKeys.push(notification.key);
      hasKeysChanged = true;
      props.dispatch(removeNotification(notification.key));
    });

    if (hasKeysChanged) {
      setDisplayedKeys(newDisplayKeys);
    }
  }, [props.notifications]);

  return null;
};

const mapStateToProps = (state: any): StateProps => {
  return {
    notifications: getNotifications(state)
  };
};

export default connect(mapStateToProps)(
  React.memo(Notifier, (prevProps, nextProps) => {
    const prevNotifications = prevProps.notifications;
    const nextNotifications = nextProps.notifications;

    // re-render the component only when there are new notifications
    let areEqual = true;
    for (const nextNotification of nextNotifications) {
      if (!areEqual) {
        break;
      }
      areEqual = areEqual && prevNotifications.filter(({ key }) => nextNotification.key === key).length > 0;
    }

    return areEqual;
  })
);
