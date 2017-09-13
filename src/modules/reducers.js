import { combineReducers } from 'redux'
import ui from './ui/reducers'
import profiles from './profile/reducers'

export default combineReducers({
    ui,
    profiles
})