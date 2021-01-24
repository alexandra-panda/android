import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export const getStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk))

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
