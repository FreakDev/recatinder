import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load } from '../actions'

import ProfileMore from './ProfileMore'
import Photos from './Photos'
import Overlay from './Overlay'
import Draggable from '../../ui/components/Draggable'

import './css/Profile.css'

class ProfileCmp extends Component {

    componentDidMount() {
        this.props.onLoad()
    }

    render() {
        return (
            <div className="App-profile">
                <Draggable style={{ height: '83.5%' }}>
                    <Photos />
                    <Overlay />
                </Draggable>
                <ProfileMore />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, getState) => {
    return {
        onLoad: () => { dispatch(load()) }
    }
}

const Profile = connect(null, mapDispatchToProps)(ProfileCmp)

export default Profile