// @flow

import { fork, all } from 'redux-saga/effects';
import {
  authSaga,
  contactsSaga
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(contactsSaga),
  ]);
}
