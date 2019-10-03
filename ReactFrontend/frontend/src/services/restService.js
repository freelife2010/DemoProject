// @flow

import { set, isEmpty} from 'lodash';
import { apiEndpoint } from './constants';

export async function ApiService({ api, third_party, method, params, oauth = {}, contentType = 'json' }) {
  const headers = {};

  let path = `${apiEndpoint}${api}`;

  if (third_party) {
    path = api;
  }

  var formData = new FormData();
  if (contentType === 'form') {
    formData.append('file', params.file);
  } else if(contentType === 'image') {
    formData.append('image', params.file);
  } else {
    set(headers, 'Accept', 'application/json');
    set(headers, 'Content-Type', 'application/json');
  }

  if (oauth.jwt_access_token) {
    set(headers, 'Authorization', 'Bearer ' + oauth.jwt_access_token);
  } else if (oauth.jwt_refresh_token) {
    set(headers, 'Authorization', 'Bearer ' + oauth.jwt_refresh_token);
  }

  const reqBody = {
    method,
    headers,
  };

  if (contentType === 'form' || contentType === 'image') {
    reqBody.body = formData;
  } else {
    if (!isEmpty(params)) {
      reqBody.body = JSON.stringify(params);
    }
  }
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  return fetch(path, reqBody)
    .then(response => {
      return response.json();
    })
    .then((data) => {
      if (third_party) {
        return {
          result: 'ok',
          data
        };
      }
      return data;
    })
    .catch((error) => {
      console.log('error', error);
      return {
        result: 'error',
        message: 'Please check your internet connection!'
      };
    });
}
