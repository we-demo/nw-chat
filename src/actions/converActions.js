
import {
  LOAD_CONVERS,
} from '../const'
import * as api from '../api'
import dispatchPromise from './dispatchPromise'


export function loadConvers() {
  return dispatchPromise(
    LOAD_CONVERS,
    api.loadConvers()
  )
}
