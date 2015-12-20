
import {
  LOAD_USERS,
  LOAD_USER,
  USER_LOGIN,
  USER_LOGOUT,
} from '../const'

/*
  [user]
    - currUserId :String
    - cachedUsers :Map
*/

export function currUserId(state = null, action) {
  switch (action.type) {

    case USER_LOGIN:
      return action.payload.id

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}

export function cachedUsers(state = {}, action) {
  switch (action.type) {

    case LOAD_USERS:
      return {
        ...state,
        ...action.payload,
      }

    case LOAD_USER:
    case USER_LOGIN:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}
