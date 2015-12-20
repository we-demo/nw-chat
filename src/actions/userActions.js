
import {
  USER_LOGIN,
  LOAD_USERS,
  LOAD_USER,
} from '../const'
import * as api from '../api'
import dispatchPromise from './dispatchPromise'


export function userLogin(id, password) {
  return dispatchPromise(
    USER_LOGIN,
    api.userLogin(id, password)
  )
}

export function loadUsers() {
  return dispatchPromise(
    LOAD_USERS,
    api.loadUsers()
  )
}

export function loadUser(id) {
  return dispatchPromise(
    LOAD_USER,
    api.loadUser(id)
  )
}

