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

const current = (state = -1, action) => state

export const profiles  = combineReducers({
    list,
    current,
});


const expanded = (state = false, action) => state

export const profileUI = combineReducers({
    expanded
})

