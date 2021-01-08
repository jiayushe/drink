import produce from 'immer';

import * as types from './types';

const initialState: types.SessionState = {
  user: localStorage.getItem('username')
    ? {
        name: localStorage.getItem('username'),
        nickname: localStorage.getItem('nickname'),
        profile: localStorage.getItem('profile')
      }
    : null
};

const sessionReducer = produce((draft: types.SessionState, action: types.SessionActionTypes) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      draft.user = action.user;
      return;
    }
  }
}, initialState);

export default sessionReducer;
