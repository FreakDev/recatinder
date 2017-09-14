import React, { Component } from 'react'
import { connect } from 'react-redux'

import { nextPhoto, prevPhoto } from '../actions'

import './css/Photos.css'

export class PhotosCmp extends Component {

    constructor(props) {
        super(props)

        this._screenHalf = 0

        this._onResize = this._onResize.bind(this)
        this._onTouchEnd = this._onTouchEnd.bind(this)
    }

    componentDidMount() {
        this._onResize()
        window.addEventListener('resize', this._onResize)
    }

    _onResize() {
        this._screenHalf = Math.floor(window.innerWidth / 2);
    }

    _onTouchEnd (e) {
        if (!this.props.preventTouchEvent) {
            const xPos = e.changedTouches[0].pageX 
            if (xPos > this._screenHalf) {
                this.props.onNextPhoto()
            } else {
                this.props.onPrevPhoto()
            }
        }
    }

    render() {
        let { photos, currentPhoto } = this.props
        return (
            photos.length ? (
                <div className="photos">
                    <ul className="navigator" style={{ visibility: photos.length > 1 ? 'visible' : 'hidden' }}>
                        { photos.map((photo, k) => (
                            <li key={ "nagigator-tab-" + k } 
                                className={['navigator-tab', 'sub-' + photos.length,  (currentPhoto === k && 'active')].join(' ')} >&nbsp;</li>
                        ) ) }
                    </ul>
                    { photos.map((photo, k) => (
                        <div key={ "nagigator-content-" + k } 
                             className={['navigator-content', (currentPhoto === k && 'active')].join(' ')} 
                             style={{ backgroundImage: 'url(' + photo + ')' }}
                             onTouchEnd={ this._onTouchEnd } ></div>
                    ) ) }
                </div>
            ) : (
                <div className="photos no-photos"></div>
            )
        )
    
    }
}

const mapStateToProps = state => {
    return {
        photos: state.profiles.current !== -1 ? state.profiles.list[state.profiles.current].photos : [],
        currentPhoto: state.profileUI.currentPhoto
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNextPhoto: () => { dispatch(nextPhoto()) },
        onPrevPhoto: () => { dispatch(prevPhoto()) }
    }
}

const Photos = connect(mapStateToProps, mapDispatchToProps)(PhotosCmp)

export default Photos