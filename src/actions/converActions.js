
import {
  LOAD_CONVERS,
  SET_CURR_CONVER,
} from '../const'
import * as api from '../api'
import dispatchPromise from './dispatchPromise'


export function loadConvers() {
  return dispatchPromise(
    LOAD_CONVERS,
    api.loadConvers()
  )
}

export function setCurrConver(id) {
  return dispatchPromise(
    SET_CURR_CONVER,
    id
  )
}
