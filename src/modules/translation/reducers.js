import { combineReducers } from 'redux'
import * as acts from './actions'

const keys = (state = [], action) => {
    switch (action.type) {
        case acts.ADD_TRANSLATION:
            const keys = Object.keys(action.data.translations)
            if (state.length === 0) {
                return keys
            } else if (keys.length !== state.length) {
                throw new Error('Translation error : trying to load incompatible translation data (state keys : ' + state.join(', ') + ', keys : ' + keys.join(', ') + ')' )
            }
        default:
            return state
    }
}

const labels = (state = [], action) => {
    switch (action.type) {
        case acts.ADD_TRANSLATION:
            const keys = Object.keys(action.data.translations)
            const data = keys.map(v => action.data.translations[v])
            const newState = data.map((v, i) => (state[i] || []).concat(v))
            return newState
        default:
            return state
    }
}

const locales = (state = [], action) => {
    switch (action.type) {
        case acts.ADD_TRANSLATION:
            return state.concat(action.data.locales)
        default:
            return state
    }
}

const locale = (state = '', action) => {
    switch (action.type) {
        case acts.SET_LOCALE:
            return action.locale
        default:
            return state
    }
}

export default combineReducers({
    locale,

    locales,
    keys,
    labels,
})