import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import App from './App'
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component'
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <PersistGate persistor={ persistor }>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </PersistGate>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'))

