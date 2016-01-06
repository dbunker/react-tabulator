import 'babel-core/polyfill'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from 'containers/App'
import configureStore from 'store/configureStore'

const store = configureStore()

/* global document CONTAINER */

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(CONTAINER)
)
