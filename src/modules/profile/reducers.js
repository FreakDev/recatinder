import { combineReducers } from 'redux'

import * as acts from './actions'

const list = (state = [], action) => {
    switch (action.type) {
        case acts.LOADED:
            return action.data
        default:
            return state;
    }
}

const current = (state = -1, action) => {
    switch (action.type) {
        case acts.LOADED:
            return 0
        default:
            return state
    }
}

export const profiles  = combineReducers({
    list,
    current,
})

const currentPhoto = (state = 0, action) => {
    switch(action.type) {
        case acts.LOADED:
            return 0
        default:
            return state
    }
}

const expanded = (state = false, action) => state

export const profileUI = combineReducers({
    expanded,
    currentPhoto
})

