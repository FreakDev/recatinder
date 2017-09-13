import React from 'react'
import { connect } from 'react-redux'

import './css/Photos.css'

export const PhotosCmp = (photos) => {
    return (
        photos.length ? (
            <div className="photos">
                <ul className="navigator">
                    { photos.map((photo, k) => (
                        <li key={ "nagigator-tab-" + k } className="navigator-tab">&nbsp;</li>
                    ) ) }
                </ul>
                { photos.map((photo, k) => (
                    <div key={ "nagigator-content-" + k } className="navigator-content" style={{ backgroundImage: photo }}></div>
                ) ) }
            </div>
        ) : (
            <div className="photos no-photos"></div>
        )
    )
}

const mapStateToProps = state => {
    return {
        photos: []   
    }
}

const Photos = connect(mapStateToProps, null)(PhotosCmp)

export default Photos