import axios, { AxiosError, AxiosPromise } from 'axios';
import { ApiPromise, ApiResponse, StatusMessageType } from 'src/types';

import { BACKEND_URL } from './../constants';
import { csrfToken as initialToken } from './server-context';

const DEFAULT_API_RESPONSE: ApiResponse<{}> = Object.freeze({
  code: -1,
  data: {},
  messages: [
    {
      content: 'Request failed. Please check your Internet connection.',
      type: StatusMessageType.Error
    }
  ],
  errors: {}
});

const client = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 30_000,
  withCredentials: false
});

class BaseAPI {
  private static csrfToken = initialToken;

  /**
   * Performs an asynchronous HTTP GET request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param params The URL parameters to be sent with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected get<D>(url: string, params?: any): ApiPromise<D> {
    return processRequest(url, client.get(url, { params, ...this.getConfig() }));
  }

  /**
   * Performs an asynchronous HTTP POST request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected post<D>(url: string, data: any = {}, multipart: boolean = false): ApiPromise<D> {
    return processRequest(url, client.post(url, data, this.getConfig(multipart)));
  }

  /**
   * Performs an asynchronous HTTP PUT request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected put<D>(url: string, data: any = {}): ApiPromise<D> {
    return processRequest(url, client.put(url, data, this.getConfig()));
  }

  /**
   * Performs an asynchronous HTTP PATCH request to the given URL.
   * @param url The resource upon which to apply the request.
   * @param data The data to be sent along with the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected patch<D>(url: string, data: any = {}): ApiPromise<D> {
    return processRequest(url, client.patch(url, data, this.getConfig()));
  }

  /**
   * Performs an asynchronous HTTP DELETE request to the given URL.
   * @param url The resource upon which to apply the request.
   * @returns ApiPromise<D> A Promise that resolves to `ApiResponse<D>` if the
   *     request was successful, or rejects with an `ApiResponse<{}>` if the request fails.
   */
  protected delete<D>(url: string): ApiPromise<D> {
    return processRequest(url, client.delete(url, this.getConfig()));
  }

  protected setCsrfToken(token: string) {
    BaseAPI.csrfToken = token;
  }

  private getConfig(multipart: boolean = false) {
    if (multipart) {
      return {
        headers: {
          // Content-Type is set to undefined for the XHR to be sent as a multipart request,
          // so binary data can be sent successfully to the backend.
          'Content-Type': undefined,
          'Accept': 'application/json',
          'X-CSRF-Token': BaseAPI.csrfToken
        }
      };
    }
    return {
      headers: {
        'Accept': 'application/json',
        'X-CSRF-Token': BaseAPI.csrfToken
      }
    };
  }
}

function processRequest<D>(endpoint: string, promise: AxiosPromise<ApiResponse<D>>): ApiPromise<D> {
  return promise
    .then((response) => {
      const apiResponse = response.data;
      if (process.env.NODE_ENV === 'development') {
        /* tslint:disable-next-line */
        console.info(`[API] ${apiResponse.code} ${endpoint} : ${getResponseMessages(apiResponse)}`);
      }
      return apiResponse;
    })
    .catch((error: AxiosError) => {
      const apiResponse: ApiResponse<{}> =
        error.response && error.response.data ? error.response.data : DEFAULT_API_RESPONSE;
      if (process.env.NODE_ENV === 'development') {
        /* tslint:disable-next-line */
        console.error(`[API] ${apiResponse.code} ${endpoint} : ${getResponseMessages(apiResponse)}`);
      }
      throw apiResponse;
    });
}

function getResponseMessages(response: ApiResponse<any>): string {
  return response.messages && response.messages.length > 0
    ? response.messages.map((message) => message.content).join(' : ')
    : '';
}

export default BaseAPI;
