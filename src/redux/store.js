import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'
import { persistStore } from 'redux-persist'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
