import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load } from '../actions'
import { nextPhoto, prevPhoto } from '../actions'

import ProfileMore from './ProfileMore'
import Photos from './Photos'
import Overlay from './Overlay'
import ButtonsBar from './ButtonsBar'
import Draggable, { SWIPE_DETECTION_LIMIT } from '../../ui/components/Draggable'

import './css/Profile.css'

const styleHeight = { height: '83.5%' }
const initialState = {
    nextScale: 0.8,
    nextOpacity: 0
}

class ProfileCmp extends Component {

    state = initialState

    componentDidMount() {
        this.props.onLoad()

        this._onDrag = this._onDrag.bind(this)
        this._onDragCanceled = this._onDragCanceled.bind(this)
    }

    _onDrag(e) {
        this.setState({
            nextScale: Math.min(0.95 + (e.distance / (SWIPE_DETECTION_LIMIT * 15)) * 0.5, 1),
            nextOpacity: (e.distance / (SWIPE_DETECTION_LIMIT))
        })
    }

    _onDragCanceled() {
        this.setState(initialState)
    }

    render() {
        const { draggableProps, photoIndex, disableDrag, profile, profileNext, onNextPhoto, onPrevPhoto } = this.props
        return (
            <div className={ 'App-profile ' + (this.props.expanded && 'expanded') }>
                <div className="next" style={ Object.assign({ transform: 'scale(' + this.state.nextScale + ')', opacity: this.state.nextOpacity }, styleHeight) } >
                    <Photos photos={ profileNext } />
                </div>
                <Draggable style={ styleHeight } 
                            { ...draggableProps } 
                            disable={ disableDrag } 
                            onDrag={ this._onDrag }
                            onSwipeCanceled={ this._onDragCanceled } >
                    <Photos photos={ profile } currentPhoto={ photoIndex } onNextPhoto={ onNextPhoto } onPrevPhoto={ onPrevPhoto } />
                    <Overlay { ...this.props.profile } />
                </Draggable>
                <ProfileMore />
                <ButtonsBar />                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profiles.current !== -1 ? state.profiles.list[state.profiles.current].photos : [],
        profileNext: state.profiles.current !== -1 ? state.profiles.list[state.profiles.current + 1].photos : [],
        photoIndex: state.profileUI.currentPhoto,
        expanded: state.profileUI.expanded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => { dispatch(load()) }, 
        draggableProps: {
            onSwipeStart: () => {},
            onSwipeRight: () => { console.log('nope') },
            onSwipeLeft: () => { console.log('like') },
            onSwipeCanceled: () => {},    
        },
        onNextPhoto: () => dispatch(nextPhoto()),
        onPrevPhoto: () => dispatch(prevPhoto())
    }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileCmp)

export default Profile