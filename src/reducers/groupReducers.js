
import _ from 'lodash'
import {
  LOAD_GROUPS,
  LOAD_GROUP,
  LOAD_DISCUS,
  LOAD_DISCU,
} from '../const'

/*
  [group]
    - cachedGroups :Map
*/

export function cachedGroups(state = {}, action) {
  switch (action.type) {

    case LOAD_GROUPS:
      return {
        ...state,
        ...action.payload,
      }

    case LOAD_GROUP:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}

export function cachedDiscus(state = {}, action) {
  switch (action.type) {

    case LOAD_DISCUS:
      return {
        ...state,
        ...action.payload,
      }

    case LOAD_DISCU:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}
