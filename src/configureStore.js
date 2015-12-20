
import {
  createStore, applyMiddleware,
  compose, combineReducers,
} from 'redux'
import promise from 'redux-promise'
import * as reducers from './reducers'

const finalCreateStore = compose(
  applyMiddleware(promise),
)(createStore)

const rootReducer = combineReducers({
  ...reducers,
})

function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}

export default configureStore
