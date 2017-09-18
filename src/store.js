import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import rootReducer from './modules/reducers'

import { addTranslation, setLocale } from './modules/translation'
import { default as fr_lang } from './fr.json'
import { default as en_lang } from './en.json'


export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [  
  thunk,
  // routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

store.dispatch(addTranslation(fr_lang))
store.dispatch(addTranslation(en_lang))

store.dispatch(setLocale("fr_FR"))

export default store