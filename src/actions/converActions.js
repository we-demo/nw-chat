
import {
  LOAD_CONVERS,
  SET_CURR_CONVER,
  SAVE_EDITOR,
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

export function saveEditor(id, html) {
  return dispatchPromise(
    SAVE_EDITOR,
    { id, html }
  )
}
