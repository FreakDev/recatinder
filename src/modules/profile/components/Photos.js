import React from 'react'
import { connect } from 'react-redux'

import './css/Photos.css'

export const PhotosCmp = ({photos, currentPhoto}) => {
    return (
        photos.length ? (
            <div className="photos">
                <ul className="navigator" style={{ visibility: photos.length > 1 ? 'visible' : 'hidden' }}>
                    { photos.map((photo, k) => (
                        <li key={ "nagigator-tab-" + k } 
                            className={['navigator-tab', 'sub-' + photos.length,  (currentPhoto === k && 'active')].join(' ')} >&nbsp;</li>
                    ) ) }
                </ul>
                { photos.map((photo, k) => console.log(photo) || (
                    <div key={ "nagigator-content-" + k } 
                         className={['navigator-content', (currentPhoto === k && 'active')].join(' ')} 
                         style={{ backgroundImage: 'url(' + photo + ')' }}></div>
                ) ) }
            </div>
        ) : (
            <div className="photos no-photos"></div>
        )
    )
}

const mapStateToProps = state => {
    return {
        photos: state.profiles.current !== -1 ? state.profiles.list[state.profiles.current].photos : [],
        currentPhoto: state.profileUI.currentPhoto
    }
}

const Photos = connect(mapStateToProps, null)(PhotosCmp)

export default Photos