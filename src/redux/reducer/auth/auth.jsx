import * as AuthConstants from '../../action/auth/AuthConstants'
import jwt_decode from 'jwt-decode'

const initialState = {
  tokenIsFetching: false,
  token: localStorage.getItem('kg_risks_token') || null,
  userInfo: JSON.parse(localStorage.getItem('kg_risks_user_info')) || {},
  loginFailed: false,
  registrationUserData: {},
  registrationUserIsFetching: {},
  registrationUserErrorMessage: {},
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    // LOGIN
    case AuthConstants.LOGIN_REQUEST:
      return {
        ...state,
        tokenIsFetching: true,
      }

    case AuthConstants.LOGIN_SUCCESS:
      localStorage.setItem('kg_risks_token', action.headers.authorization)
      localStorage.setItem('kg_risks_user_info', JSON.stringify(jwt_decode(action.headers.authorization)))
      return {
        ...state,
        token: action.headers.authorization,
        userInfo: jwt_decode(action.headers.authorization),
        tokenIsFetching: false,
      }

    case AuthConstants.LOGIN_FAILED:
      return {
        ...state,
        tokenIsFetching: false,
        loginFailed: true,
      }

    case AuthConstants.LOGIN_CLEAR:
      return {
        ...state,
        tokenIsFetching: false,
        loginFailed: false,
      }

    // REGISTRATION
    case AuthConstants.REGISTER_REQUEST:
      return {
        ...state,
        registrationUserIsFetching: true,
      }

    case AuthConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registrationUserData: action.data,
        registrationUserIsFetching: false,
      }

    case AuthConstants.REGISTER_FAILED:
      return {
        ...state,
        registrationUserIsFetching: false,
        registrationUserErrorMessage: true,
      }

    case AuthConstants.LOGOUT_USER:
      localStorage.removeItem('kg_risks_token')
      localStorage.removeItem('kg_risks_user_info')
      return {
        ...state,
        token: null,
        userInfo: {},
      }

    default:
      return state
  }
}