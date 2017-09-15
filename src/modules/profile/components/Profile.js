import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load } from '../actions'
import { nextPhoto, prevPhoto } from '../actions'
import { like, nope } from '../actions'

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
        this._onDragEnd = this._onDragEnd.bind(this)
        this._onSwipeLeft = this._onSwipeLeft.bind(this)
        this._onSwipeRight = this._onSwipeRight.bind(this)
    }

    _onDrag(e) {
        this.setState({
            nextScale: Math.min(0.95 + (e.distance / (SWIPE_DETECTION_LIMIT * 15)) * 0.5, 1),
            nextOpacity: (e.distance / (SWIPE_DETECTION_LIMIT))
        })
    }

    _reset() {
        this.setState(initialState)
    }

    _onDragEnd() {
        this._reset()
    }

    _onSwipeLeft() {
        this.props.onSwipeLeft()
    }

    _onSwipeRight() {
        this.props.onSwipeRight()
    }

    render() {
        const { photoIndex, disableDrag, profile, profileNext, onNextPhoto, onPrevPhoto, goNext } = this.props
        let targetStyle
        if (goNext) {
            targetStyle = { opacity: 0 }
        }
        return (
            <div className={ 'App-profile' + (this.props.expanded ? ' expanded':'') + (goNext !== 0 ? ' goNext' : '')}>
                <div className="next" style={ Object.assign({ transform: 'scale(' + this.state.nextScale + ')', opacity: this.state.nextOpacity }, styleHeight) } >
                    <Photos photos={ profileNext } />
                </div>
                <div className="current" style={ styleHeight }>
                    <Draggable disable={ disableDrag } 
                               onDrag={ this._onDrag }
                               onSwipeLeft={ this._onSwipeLeft }
                               onSwipeRight={ this._onSwipeRight }
                               onSwipeCanceled={ this._onDragEnd }
                               style={ targetStyle } >
                        <Photos photos={ profile } 
                                currentPhoto={ photoIndex } 
                                onNextPhoto={ onNextPhoto } 
                                onPrevPhoto={ onPrevPhoto } />
                        <Overlay { ...this.props.profile } />
                    </Draggable>
                    <ProfileMore />
                </div>
                <ButtonsBar />                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profiles.current ? state.profiles.current.photos : [],
        profileNext: state.profiles.next ? state.profiles.next.photos : [],
        photoIndex: state.profileUI.currentPhoto,
        expanded: state.profileUI.expanded,
        goNext: state.profileUI.goNext
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => { dispatch(load()) }, 
        onSwipeRight: () => { console.log('nope') },
        onSwipeLeft: () => { dispatch(like()) },
        onNextPhoto: () => dispatch(nextPhoto()),
        onPrevPhoto: () => dispatch(prevPhoto())
    }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileCmp)

export default Profile