import {
  CONTACTS_REQUEST_SUCCESS,
  CONTACTS_REQUEST_FAIL
} from './actions';
import { initialState } from '../initialState';

export default function contacts(state = initialState.contacts, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS_REQUEST_SUCCESS: {
      return {
        ...state,
        list: payload.contacts
      }
    }
    case CONTACTS_REQUEST_FAIL: {
      return {
        ...state,
        list: []
      }
    }
    default: {
      return state;
    }
  }
}
