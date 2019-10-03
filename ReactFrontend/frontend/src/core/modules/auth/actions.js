import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'login/LOGIN_REQUEST_SUCCESS';
export const LOGOUT_REQUEST = 'logout/LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'logout/LOGOUT_REQUEST_SUCCESS';

/**
 * Action Creators
 */
export const authActionCreators = {
  login: createPromiseAction(LOGIN_REQUEST),
  loginSuccess: createAction(LOGIN_REQUEST_SUCCESS),
  logOut: createPromiseAction(LOGOUT_REQUEST),
  logOutSuccess: createAction(LOGOUT_REQUEST_SUCCESS),
};
