
import {
  SET_CURR_USER,
} from '../const/actionTypes'

/*
  [user]
    - currUserId
    - usersLoaded
*/

function currUserId(state = null, action) {
  switch (action.type) {
    case SET_CURR_USER:
      return action.userId

    default:
      return state
  }
}

export {
  currUserId,
}
