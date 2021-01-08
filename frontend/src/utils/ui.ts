import { AnyAction } from 'redux';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { ThunkDispatch } from 'redux-thunk';

import { enqueueNotification } from 'src/modules/notifications/operations';
import { ApiResponse, StatusMessage, StatusMessageType } from 'src/types';

/**
 * Displays the loading bar while the API request is being run and displays
 * snackbars showing the status messages returned by the API request.
 *
 * @param dispatch The dispatch function used for dispatching loading
 *     bar actions to the Redux store.
 * @param promise The asynchronous API request that is being run.
 */
export function handleApiRequest<R, S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  promise: Promise<ApiResponse<R>>
): Promise<ApiResponse<R>> {
  return withStatusMessages(dispatch, withLoadingIndicator(dispatch, promise));
}

/**
 * Displays the loading bar while a variable number of API requests are being run,
 * and displays snackbars showing the status messages returned by each API request.
 *
 * Note that the promise returned by this function resolves only after all API
 * requests have either resolved or rejected.
 *
 * @param dispatch The dispatch function used for dispatching loading
 *     bar actions to the Redux store.
 * @param promises The asynchronous API requests that are being run.
 */
export function handleApiRequests<S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  ...promises: Array<Promise<ApiResponse<any>>>
): Promise<any[]> {
  return withLoadingIndicator(
    dispatch,
    Promise.all(
      promises.map((promise) => {
        return withStatusMessages(dispatch, promise).catch((response) => response);
      })
    )
  );
}

/**
 * Displays the loading bar while an asychronous action is being run
 * and hides the bar after the action completes.
 *
 * @param dispatch The dispatch function used for dispatching loading
 *     bar actions to the Redux store.
 * @param promise The asynchronous action that is being run.
 */
export function withLoadingIndicator<R, S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  promise: Promise<R>
): Promise<R> {
  dispatch(showLoading());
  return promise
    .then((result) => {
      dispatch(hideLoading());
      return result;
    })
    .catch((error) => {
      dispatch(hideLoading());
      throw error;
    });
}

/**
 * Displays the status messages returned by an asynchronous API request.
 * The status messages will be shown in individual snackbars.
 *
 * @param dispatch The dispatch function used for dispatching loading
 *     bar actions to the Redux store.
 * @param promise The asynchronous API request that is being run.
 */
export function withStatusMessages<R, S, E>(
  dispatch: ThunkDispatch<S, E, AnyAction>,
  promise: Promise<ApiResponse<R>>
): Promise<ApiResponse<R>> {
  return promise
    .then((response) => {
      showStatusMessages(dispatch, response.messages);
      return response;
    })
    .catch((response: ApiResponse<{}>) => {
      showStatusMessages(dispatch, response.messages);
      throw response;
    });
}

function showStatusMessages(dispatch: ThunkDispatch<any, any, AnyAction>, messages: StatusMessage[]) {
  messages.forEach((message) => {
    dispatch(enqueueNotification(message.content, getNotificationVariant(message.type)));
  });
}

function getNotificationVariant(type: StatusMessageType) {
  switch (type) {
    case StatusMessageType.Error:
      return 'error';
    case StatusMessageType.Warning:
      return 'warning';
    case StatusMessageType.Information:
      return 'info';
    case StatusMessageType.Success:
      return 'success';
  }
}
