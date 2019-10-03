import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  contactsActionCreators,
  CONTACTS_REQUEST,
} from './actions';

import { ApiService } from '../../../services';

export function* asyncContactsRequest({ payload, resolve, reject }) {
  try {
    const response = yield call(ApiService,
      {
        api: '/contacts',
        method: 'GET',
        params: {
        }
      });
    const dummyData = [
      {name: 'Temp1'},
      {name: 'Temp1'},
      {name: 'Temp1'},
      {name: 'Temp1'},
      {name: 'Temp1'},      
    ]
    if (response && response.result === 'error') {
      yield put(contactsActionCreators.getContactsFail());
    } else {
      yield put(contactsActionCreators.getContactsSuccess({ contacts: response || dummyData }));
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchContactsRequest() {
  while (true) {
    const action = yield take(CONTACTS_REQUEST);
    yield* asyncContactsRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchContactsRequest),
  ]);
}
