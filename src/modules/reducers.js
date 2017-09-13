import { combineReducers } from 'redux'
import ui from './ui/reducers'
import { profiles } from './profile/reducers'
import { profileUI } from './profile/reducers'

export default combineReducers({
    ui,
    profiles,
    profileUI
})