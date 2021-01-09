import * as React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import HomeIndex from 'src/modules/home/components/HomeIndex';
import * as session from 'src/modules/session';
import NewUserPage from 'src/modules/session/components/NewUserPage';
import SignInPage from 'src/modules/session/components/SignInPage';
import UpdateUserPage from 'src/modules/session/components/UpdateUserPage';
import TestPage from 'src/modules/test/components/TestPage';

import AppMainLayout from './AppMainLayout';
import ErrorBoundary from './ErrorBoundary';

type Props = RouteComponentProps;

const AuthenticatedPages: React.FC<Props> = (props) => {
  // const loggedIn = useSelector(session.selectors.isLoggedIn);
  // if (!loggedIn) {
  //   return <Redirect to={{ pathname: '/signin', state: { to: props.location } }} />;
  // }

  const defaultRoute = <Route exact path='/' component={HomeIndex} />;
  const homeIndexRoute = <Route exact path='/home' component={HomeIndex} />;
  const signInRoute = <Route exact path='/signIn' component={SignInPage} />;
  const signUpRoute = <Route exact path='/signUp' component={NewUserPage} />;
  const testRoute = <Route exact path='/test' component={TestPage} />;
  const updateUserRoute = <Route exact path='/user' component={UpdateUserPage} />;
  const catchAllRoute = <Route path='/' render={() => <div>404 Page Not Found</div>} />;

  return (
    <AppMainLayout>
      <ErrorBoundary style={{}}>
        <Switch>
          {defaultRoute}
          {homeIndexRoute}
          {signInRoute}
          {signUpRoute}
          {testRoute}
          {updateUserRoute}
          {catchAllRoute}
        </Switch>
      </ErrorBoundary>
    </AppMainLayout>
  );
};

export default withRouter(AuthenticatedPages);
