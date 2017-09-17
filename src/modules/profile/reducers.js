import { combineReducers } from 'redux'

import * as acts from './actions'

const current = (state = null, action) => {
    switch (action.type) {
        case acts.LOADED:
        case acts.LIKE:
        case acts.NOPE:
        case acts.STAR:
            return action.current
        default:
            return state;
    }
}

const next = (state = null, action) => {
    switch (action.type) {
        case acts.LOADED:
        case acts.LIKE:
        case acts.NOPE:
        case acts.STAR:        
            return action.next
        default:
            return state
    }
}

export const profiles  = combineReducers({
    next,
    current,
})

const currentPhoto = (state = 0, action) => {
    switch(action.type) {
        case acts.LOADED:
        case acts.LIKE:
            return 0
        case acts.NEXT_PHOTO:
            return state + 1
        case acts.PREV_PHOTO:
            return state > 0 ? state - 1 : 0
        default:
            return state
    }
}

const expanded = (state = false, action) => {
    switch (action.type) {
        case acts.EXPAND_PROFILE:
            return action.open
        default:
            return state
    }
}

const goNext = (state = 0, action) => {
    switch(action.type) {
        case acts.GO_NEXT:
            return action.direction
        case acts.LIKE:
        case acts.NOPE:
        case acts.STAR:
            return 0
        default:
            return state
    }
}

const clickNext = (state = 0, action) => {
    switch(action.type) {
        case acts.CLICK_NEXT:
            return action.direction
        case acts.LIKE:
        case acts.NOPE:
        case acts.STAR:
            return 0
        default:
            return state
    }
}

export const buttons = (state = ['refresh', 'nope', 'super', 'like', 'boost'], action) => state

export const profileUI = combineReducers({
    expanded,
    goNext,
    clickNext,
    currentPhoto,
    buttons    
})

