import {
  put,
  // call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  authActionCreators,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from './actions';

// import { ApiService } from '../../../services';

export function* asyncLoginRequest({ payload, resolve, reject }) {
  const { username, password } = payload;
  try {
    // const response = yield call(ApiService,
    //   {
    //     api: api_url,
    //     method: 'POST',
    //     params: {
    //       username,
    //       password
    //     }
    //   });
    if (username === 'Admin' && password === 'test1A') {
      yield put(authActionCreators.loginSuccess({ user: {name: 'Admin'} }));
      resolve({name: 'Admin'})
    } else {
      reject({msg: 'invalid-credentials'})
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncLogOutRequest({ payload, resolve, reject }) {
  try {
    yield put(authActionCreators.logOutSuccess({}));
  } catch (e) {
    reject(e);
  }
}

export function* watchLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    yield* asyncLoginRequest(action);
  }
}

export function* watchLogOutRequest() {
  while (true) {
    const action = yield take(LOGOUT_REQUEST);
    yield* asyncLogOutRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchLoginRequest),
    fork(watchLogOutRequest),
  ]);
}
