import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load } from '../actions'

import ProfileMore from './ProfileMore'
import Photos from './Photos'
import Overlay from './Overlay'
import ButtonsBar from './ButtonsBar'
import Draggable from '../../ui/components/Draggable'


import './css/Profile.css'

class ProfileCmp extends Component {

    componentDidMount() {
        this.props.onLoad()
    }

    render() {
        let draggableProps = Object.assign({}, this.props)
        delete draggableProps.onLoad
        return (
            <div className={ 'App-profile ' + (this.props.expanded && 'expanded') }>
                {/* <Photos className="next" /> */}
                <Draggable style={{ height: '83.5%' }} { ...draggableProps }>
                    <div className="content">
                        <Photos />
                        <Overlay { ...this.props.profile } />
                    </div>
                </Draggable>
                <ProfileMore />
                <ButtonsBar />                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profiles.list[state.profiles.current],
        expanded: state.profileUI.expanded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => { dispatch(load()) },
        onSwipeStart: () => {},
        onSwipeRight: () => { console.log('nope') },
        onSwipeLeft: () => { console.log('like') },
        onSwipeStart: () => {},
        onSwipeCanceled: () => {}
    }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileCmp)

export default Profile