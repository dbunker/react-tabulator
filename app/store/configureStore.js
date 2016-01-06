import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from 'reducers/reducers'
import { getData } from 'actions/listActions'

/* global ENV */

export default function configureStore(initialState) {

  const middleware = [thunk]
  if (ENV === 'dev') {
    middleware.push(logger())
  }

  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/reducers', () => {
      const nextReducer = require('reducers/reducers')
      store.replaceReducer(nextReducer)
    })
  }

  store.dispatch(getData())

  return store
}
