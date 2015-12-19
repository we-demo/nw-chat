
import { combineReducers } from 'redux'
import * as userReducers from './userReducers'
import * as converReducers from './converReducers'

const rootReducer = combineReducers({
  ...userReducers,
  ...converReducers,
})

export default rootReducer
