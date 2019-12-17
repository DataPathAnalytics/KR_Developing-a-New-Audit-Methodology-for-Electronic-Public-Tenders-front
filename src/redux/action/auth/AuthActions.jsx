import { CALL_API } from '../../../middleware/api'
import { apiEndpoints } from '../../../services/ApiEndpointsConstants'
import {
  LOGIN_USER,
  REGISTER_USER,
} from '../../../services/ApiEndpointsConstants'
import * as Auth from './AuthConstants'

export function loginUser(requestParams) {
  return {
    [CALL_API]: {
      config: {
        data: requestParams,
        method: 'post',
      },
      endpoint: apiEndpoints().entity(LOGIN_USER),
      types: [
        Auth.LOGIN_REQUEST,
        Auth.LOGIN_SUCCESS,
        Auth.LOGIN_FAILED,
      ],
    },
  }
}

export function clearLoginError() {
  return {
    type: Auth.LOGIN_CLEAR,
  }
}

export function registerUser(requestParams) {
  return {
    [CALL_API]: {
      config: {
        data: requestParams,
        method: 'post',
      },
      endpoint: apiEndpoints().entity(REGISTER_USER),
      types: [
        Auth.REGISTER_REQUEST,
        Auth.REGISTER_SUCCESS,
        Auth.REGISTER_FAILED,
      ],
    },
  }
}


export function logOutUser() {
  return {
    type: Auth.LOGOUT_USER,
  }
}
