import { combineReducers } from 'redux'

import * as acts from './actions'

const current = (state = null, action) => {
    switch (action.type) {
        case acts.LOADED:
        case acts.NEXT:
            return action.current
        default:
            return state;
    }
}

const next = (state = null, action) => {
    switch (action.type) {
        case acts.LOADED:
        case acts.NEXT:
            return action.next
        default:
            return state
    }
}

const animal = (state = 'cats', action) => {
    switch(action.type) {
        case acts.SET_ANIMAL:
            return action.animal
        default:
            return state
    }
}

export const profiles  = combineReducers({
    next,
    current,
    animal    
})

const currentPhoto = (state = 0, action) => {
    switch(action.type) {
        case acts.LOADED:
        case acts.NEXT:
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
            return action.choice
        case acts.NEXT:
                return 0
        default:
            return state
    }
}

export const buttons = (state = ['refresh', 'nope', 'super', 'like', 'boost'], action) => state

export const profileUI = combineReducers({
    expanded,
    goNext,
    currentPhoto,
    buttons
})

