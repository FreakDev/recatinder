import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'

import ui from './ui/reducers'
import translation from './translation/reducers'
import { profiles } from './profile/reducers'
import { profileUI } from './profile/reducers'


export default combineReducers({
    // routing: routerReducer,
    ui,
    profiles,
    profileUI,
    translation
})