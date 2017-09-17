import React, { Component } from 'react'
import { connect } from 'react-redux'

import { load } from '../actions'
import { nextPhoto, prevPhoto } from '../actions'
import { next } from '../actions'
import { expandProfile } from '../actions'

import ProfileMore from './ProfileMore'
import Photos from './Photos'
import Overlay from './Overlay'
import ButtonsBar from './ButtonsBar'
import Draggable, { SWIPE_DETECTION_LIMIT } from '../../ui/components/Draggable'

import './css/Profile.css'

const styleHeight = { height: '83.5%' }

const INITIAL_PHOTO_SCALE = 1
const INITIAL_MORE_TOP = 97.5

const INITIAL_STATE = {
    nextScale: null,
    nextOpacity: null,
    photoScale: null,
    moreTop: null,
}

class ProfileCmp extends Component {

    state = INITIAL_STATE

    _containerNode = null

    componentDidMount() {
        this.props.onLoad()

        this._onDrag = this._onDrag.bind(this)
        this._onDragEnd = this._onDragEnd.bind(this)
        this._onSwipeLeft = this._onSwipeLeft.bind(this)
        this._onSwipeRight = this._onSwipeRight.bind(this)
        this._onSwipeUp = this._onSwipeUp.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.goNext !== 0 && nextProps.goNext === 0)
            this._reset()
    }

    _onDrag(e) {
        const distance = Math.sqrt(Math.pow(e.diffX, 2) + Math.pow(e.diffY, 2))
        if (!this.props.expanded) {
            this.setState(Object.assign({}, INITIAL_STATE, {
                nextScale: Math.min(0.95 + (distance / (SWIPE_DETECTION_LIMIT * 15)) * 0.5, 1),
                nextOpacity: Math.min((distance / (SWIPE_DETECTION_LIMIT)), 1)
            }))
        } else {
            if (Math.abs(e.diffY) > Math.abs(e.diffX)) {
                if (e.diffY < 20) {
                    if (!this._containerNode.scrollTop) {
                        this.setState(Object.assign({}, INITIAL_STATE, {
                            photoScale: Math.min(INITIAL_PHOTO_SCALE + (distance /100), 1.3),
                            moreTop: Math.min((INITIAL_MORE_TOP + distance * 0.5), 112.5)
                        }))
                    }
                } else {
                    this._reset()
                }
            } else {
                this._reset()
            }
        }
    }

    _reset() {
        this.setState(INITIAL_STATE)
    }

    _setGoNextState() {
        this.setState({
            nextScale: 1,
            nextOpacity: 1
        })
    }

    _onDragEnd() {
        this._reset()
    }

    _onSwipeRight(data) {
        if (!this.props.expanded) {
            this._setGoNextState()
            this.props.onClickLike()
        } else {
            if (data.event.target.classList.contains('navigator-content')) {
                this.props.onNextPhoto()
            }
        }
    }

    _onSwipeLeft(data) {
        if (!this.props.expanded) {
            this._setGoNextState()
            this.props.onClickNope()
        }
        else {
            if (data.event.target.classList.contains('navigator-content')) {
                this.props.onPrevPhoto()
            }
        }
    }

    _onSwipeUp() {
        if (!this.props.expanded) {
            this._setGoNextState()
            this.props.onClickSuper()
        }
    }

    render() {
        const { photoIndex, profile, profileNext, onNextPhoto, onPrevPhoto, goNext, onClickBack } = this.props
        let disableDrag = this.props.expanded
        return (
            <div ref={r => this._containerNode = r} className={ 'App-profile' + (this.props.expanded ? ' expanded':'') + (goNext !== 0 ? ' goNext' : '')}>
                <div className="next" style={ Object.assign(this.state.nextScale ? { transform: 'scale(' + this.state.nextScale + ')', opacity: this.state.nextOpacity } : {}, styleHeight) } >
                    <Photos photos={ profileNext.photos || [] } />
                    <Overlay { ...this.props.profileNext } />
                </div>
                <div className="current" style={ styleHeight } >
                    <Draggable disable={ disableDrag } 
                               onDrag={ this._onDrag }
                               onSwipeLeft={ this._onSwipeLeft }
                               onSwipeRight={ this._onSwipeRight }
                               onSwipeUp={ this._onSwipeUp }
                               onSwipeCanceled={ this._onDragEnd }
                               className={ (this.state.photoScale ? 'growing' : '') + [' left', ' up', ' right'][goNext - 1] }
                               mark={(goNext !== 0 ? ['nope', 'super', 'like'][goNext - 1] : '')} >
                        <Photos photos={ profile.photos || [] } 
                                currentPhoto={ photoIndex } 
                                onNextPhoto={ onNextPhoto } 
                                onPrevPhoto={ onPrevPhoto }  
                                style={this.state.photoScale ? { transform: 'scale(' + this.state.photoScale + ')' } : {} } />
                        <Overlay { ...this.props.profile } />
                        <ProfileMore onClickBack={ onClickBack } 
                                     profile={ profile } 
                                     style={ this.state.moreTop ? { top: this.state.moreTop + '%' } : {} } />
                    </Draggable>
                </div>
                <ButtonsBar onNope={ this.props.onClickNope }
                            onLike={ this.props.onClickLike }
                            onSuper={ this.props.onClickSuper } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profiles.current ? state.profiles.current : [],
        profileNext: state.profiles.next ? state.profiles.next : [],
        photoIndex: state.profileUI.currentPhoto,
        expanded: state.profileUI.expanded,
        goNext: state.profileUI.goNext
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => { dispatch(load()) }, 
        onNextPhoto: () => dispatch(nextPhoto()),
        onPrevPhoto: () => dispatch(prevPhoto()),
        onClickBack: () => dispatch(expandProfile(false)),
        onClickLike: () => dispatch(next(3)),
        onClickNope: () => dispatch(next(1)),
        onClickSuper: () => dispatch(next(2))
    }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileCmp)

export default Profile