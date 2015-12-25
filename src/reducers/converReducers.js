
import _ from 'lodash'
import {
  LOAD_CONVERS,
  LOAD_CONVER,
  SET_CURR_CONVER,
  ADD_CONVER,
  REMOVE_CONVER,
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
      return action.payload

    default:
      return state
  }
}

export function listedConverIds(state = [], action) {
  switch (action.type) {

    case LOAD_CONVERS:
      return [
        ...state,
        ..._.pluck(action.payload, 'targetId'),
      ]

    case ADD_CONVER:
      return [
        action.payload,
        ...state,
      ]

    case REMOVE_CONVER:
      return _.reject(state, action.payload)

    default:
      return state
  }
}

export function cachedConvers(state = {}, action) {
  switch (action.type) {

    case LOAD_CONVERS:
      return {
        ...state,
        ...action.payload,
      }

    case LOAD_CONVER:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}
