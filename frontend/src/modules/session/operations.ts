import api from 'src/api';
import { ApiResponse, Operation } from 'src/types';
import { UserData } from 'src/types/user';
import * as actions from './actions';

export function signIn(username: string, password: string): Operation<ApiResponse<UserData>> {
  return async (dispatch) => {
    const response = await api.users.signIn(username, password);
    const user = response.data.user;
    if (user.name) {
      dispatch(actions.setCurrentUser(user));
    }
    localStorage.setItem('username', user.name!);
    localStorage.setItem('nickname', user.nickname!);
    localStorage.setItem('profile', user.profile!);
    return { ...response, data: user };
  };
}

export function signOut(): Operation<ApiResponse<{}>> {
  return async (dispatch) => {
    const response = await api.users.signOut();
    dispatch(actions.setCurrentUser(null));
    localStorage.removeItem('username');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profile');
    return response;
  };
}

export function createUser(user: UserData): Operation<ApiResponse<UserData>> {
  return async (dispatch) => {
    const response = await api.users.createUser(user);
    const createdUser = response.data.user;
    if (createdUser.name) {
      dispatch(actions.setCurrentUser(createdUser));
    }
    localStorage.setItem('username', createdUser.name!);
    localStorage.setItem('nickname', createdUser.nickname!);
    localStorage.setItem('profile', createdUser.profile!);
    return { ...response, data: createdUser };
  };
}

export function updateUser(user: UserData): Operation<ApiResponse<UserData>> {
  return async (dispatch) => {
    const response = await api.users.updateUser(user);
    const updatedUser = response.data.user;
    if (updatedUser.name) {
      dispatch(actions.setCurrentUser(updatedUser));
    }
    localStorage.setItem('nickname', updatedUser.nickname!);
    localStorage.setItem('profile', updatedUser.profile!);
    return { ...response, data: updatedUser };
  };
}
