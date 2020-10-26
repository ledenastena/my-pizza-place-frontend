import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import PropTypes from 'prop-types'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../src/redux/root-reducer'
import rootSaga from '../src/redux/root-saga'

// The function to create a store with applied saga middleware
function buildStore(rootReducer, initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

function render(
  ui,
  {
    initialState,
    store = buildStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  Wrapper.defaultProps = {
    children: null,
  }

  Wrapper.propTypes = {
    children: PropTypes.node,
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// We re-export everything
export * from '@testing-library/react'
// and override the original render method
export { render }
