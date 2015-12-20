
import _ from 'lodash'
import {
  SET_CURR_CONVER,
  ADD_CONVER,
  REMOVE_CONVER,
  LOAD_CONVER,
} from '../const'

/*
  [conver]
    - currConverId :String
    - listedConverIds :List
    - cachedConvers :Map
*/

export function currConverId(state = null, action) {
  switch (action.type) {

    case SET_CURR_CONVER:
      return action.result.id

    default:
      return state
  }
}

export function listedConverIds(state = [], action) {
  switch (action.type) {

    case ADD_CONVER:
      return [
        action.result,
        ...state,
      ]

    case REMOVE_CONVER:
      return _.reject(state, action.result)

    default:
      return state
  }
}

export function cachedConvers(state = {}, action) {
  switch (action.type) {

    case LOAD_CONVER:
      return {
        ...state,
        [action.result.id]: action.result,
      }

    default:
      return state
  }
}
