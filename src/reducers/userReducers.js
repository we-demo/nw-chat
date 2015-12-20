
import {
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
      return action.result.id

    case USER_LOGOUT:
      return null

    default:
      return state
  }
}

export function cachedUsers(state = {}, action) {
  switch (action.type) {

    case USER_LOGIN:
    case LOAD_USER:
      return {
        ...state,
        [action.result.id]: action.result,
      }

    default:
      return state
  }
}
