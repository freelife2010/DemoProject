import {
  LOGOUT_REQUEST_SUCCESS,
} from '../auth/actions';

import { initialState } from '../initialState';

export default function resetReducer(state, action) {
  switch (action.type) {
      case LOGOUT_REQUEST_SUCCESS: {
        return {
            ...state,
            ...initialState,
        };
      }
      default:
        return state;
  }
}
