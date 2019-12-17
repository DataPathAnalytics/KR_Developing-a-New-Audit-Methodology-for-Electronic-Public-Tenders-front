import _ from 'lodash'
import jwt_decode from 'jwt-decode'

export function hasPermission (permission) {
  let userInfo = jwt_decode(localStorage.getItem('kg_risks_token'))
  return userInfo && _.includes(userInfo.permissions, permission)
}