import { combineReducers } from 'redux'

export const header = (state = ['profile', 'fire', 'tchat'], action) => state

export const buttons = (state = ['refresh', 'nope', 'super-like', 'like', 'boost'], action) => state

const ui = combineReducers({
    header,
    buttons
})
export default ui