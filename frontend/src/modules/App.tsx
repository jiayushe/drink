import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthenticatedPages from 'src/components/layouts/AuthenticatedPages';
import Notifier from 'src/modules/notifications/components/Notifier';
import SignInPage from 'src/modules/session/components/SignInPage';
import theme from 'src/theme';
import './App.css';
import configureStore from './store';
import NewUserPage from './session/components/NewUserPage';

const store = configureStore();

const loadingBarStyle: React.CSSProperties = {
  backgroundColor: 'orange',
  height: '3px',
  position: 'fixed',
  top: '0',
  zIndex: 100
};

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <StylesProvider>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <>
              <CssBaseline />
              <Notifier />
              <LoadingBar style={loadingBarStyle} updateTime={150} />
              <BrowserRouter>
                <Switch>
                  <Route exact path='/login' component={SignInPage} />
                  <Route exact path='/signup' component={NewUserPage} />
                  <Route path='/' component={AuthenticatedPages} />
                </Switch>
              </BrowserRouter>
            </>
          </SnackbarProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

export default App;
