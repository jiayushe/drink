import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import { ApiResponse } from 'src/types';
import { handleApiRequest } from 'src/utils/ui';
import SignIn from './SignIn';
import { signIn } from '../operations';
import { isLoggedIn } from '../selectors';

interface OwnProps {
  alert: string;
  notice: string;
}

type Props = OwnProps & RouteComponentProps;

const SignInPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  const [hasError, setHasError] = React.useState(!!props.alert);
  const [errorMessage, setErrorMessage] = React.useState(props.alert);
  const [noticeMessage, setNoticeMessage] = React.useState(props.notice);

  const showErrorMessage = (message: string) => {
    setHasError(true);
    setErrorMessage(message);
    setNoticeMessage('');
  };

  const showNoticeMessage = (message: string) => {
    setHasError(false);
    setErrorMessage('');
    setNoticeMessage(message);
  };

  const handleSignin = (username: string, password: string) => {
    showNoticeMessage('Loading...');

    handleApiRequest(dispatch, dispatch(signIn(username, password)))
      .then(() => {
        props.history.push('/');
      })
      .catch((response: ApiResponse<{}>) => {
        if (response.messages.length > 0) {
          showErrorMessage(response.messages[0].content);
        }
      });
  };

  if (loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <SignIn error={hasError} errorMessage={errorMessage} noticeMessage={noticeMessage} handleSignin={handleSignin} />
  );
};

export default withRouter(SignInPage);
