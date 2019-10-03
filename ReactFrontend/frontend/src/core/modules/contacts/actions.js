import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const CONTACTS_REQUEST = 'contacts/CONTACTS_REQUEST';
export const CONTACTS_REQUEST_SUCCESS = 'contacts/CONTACTS_REQUEST_SUCCESS';
export const CONTACTS_REQUEST_FAIL = 'contacts/CONTACTS_REQUEST_FAIL';

/**
 * Action Creators
 */
export const contactsActionCreators = {
  getContacts: createPromiseAction(CONTACTS_REQUEST),
  getContactsSuccess: createAction(CONTACTS_REQUEST_SUCCESS),
  getContactsFail: createAction(CONTACTS_REQUEST_FAIL),
};
