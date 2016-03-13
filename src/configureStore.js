
import {
  createStore, applyMiddleware,
  compose, combineReducers,
} from 'redux'
import promise from 'redux-promise'
// import createLogger from 'redux-logger'
import * as reducers from './reducers'

// const logger = createLogger()

const finalCreateStore = compose(
  // applyMiddleware(promise, logger),
  applyMiddleware(promise),
)(createStore)

const rootReducer = combineReducers({
  ...reducers,
})

function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}

export default configureStore
