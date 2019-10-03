import { combineReducers } from 'redux';
import {
  LOGOUT_REQUEST_SUCCESS,
} from '../modules/auth/actions';

import {
  auth,
  contacts,
  resetReducer
} from '../modules';

const appReducer = combineReducers({
  auth,
  contacts
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  if (action.type === LOGOUT_REQUEST_SUCCESS) {
    finalState = resetReducer(finalState, action);
  }

  return finalState;
}
