import { combineReducers } from 'redux'

export const header = (state = ['profile', 'feed', 'tchat'], action) => state

const ui = combineReducers({
    header
})
export default ui