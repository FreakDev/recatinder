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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.goNext === 1 && nextProps.goNext === 0)
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
        }
    }

    _reset() {
        this.setState(INITIAL_STATE)
    }

    _onDragEnd() {
        this._reset()
    }

    _onSwipeLeft() {
        if (!this.props.expanded) {
            this.setState({
                nextScale: 1,
                nextOpacity: 1
            })
            this.props.onSwipeLeft()
        }
    }

    _onSwipeRight() {
        if (!this.props.expanded) {
            this.props.onSwipeRight()
        }
    }

    render() {
        const { photoIndex, profile, profileNext, onNextPhoto, onPrevPhoto, goNext } = this.props
        let targetStyle = {}, disableDrag = this.props.expanded
        if (goNext) {
            targetStyle = { opacity: 0 }
        }
        return (
            <div ref={r => this._containerNode = r} className={ 'App-profile' + (this.props.expanded ? ' expanded':'') + (goNext !== 0 ? ' goNext' : '')}>
                <div className="next" style={ Object.assign(this.state.nextScale ? { transform: 'scale(' + this.state.nextScale + ')', opacity: this.state.nextOpacity } : {}, styleHeight) } >
                    <Photos photos={ profileNext } />
                </div>
                <div className="current" style={ styleHeight }>
                    <Draggable disable={ disableDrag } 
                               onDrag={ this._onDrag }
                               onSwipeLeft={ this._onSwipeLeft }
                               onSwipeRight={ this._onSwipeRight }
                               onSwipeCanceled={ this._onDragEnd }
                               style={ targetStyle }
                               className={ this.state.photoScale ? 'growing' : '' } >
                        <Photos photos={ profile } 
                                currentPhoto={ photoIndex } 
                                onNextPhoto={ onNextPhoto } 
                                onPrevPhoto={ onPrevPhoto } 
                                style={this.state.photoScale ? { transform: 'scale(' + this.state.photoScale + ')' } : {} } />
                        <Overlay { ...this.props.profile } />
                        <ProfileMore style={ this.state.moreTop ? { top: this.state.moreTop + '%' } : {} } />
                    </Draggable>
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