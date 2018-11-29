import { createStore, applyMiddleware } from 'redux'
import rootReducer from './store/index'
import { createLogger } from 'redux-logger'
​
const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
export let store = createStore(rootReducer, applyMiddleware(...middleware))