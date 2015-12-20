
import {
  LOAD_GROUPS,
  LOAD_DISCUS,
} from '../const'
import * as api from '../api'
import dispatchPromise from './dispatchPromise'


export function loadGroups() {
  return dispatchPromise(
    LOAD_GROUPS,
    api.loadGroups()
  )
}

export function loadDiscus() {
  return dispatchPromise(
    LOAD_DISCUS,
    api.loadDiscus()
  )
}
