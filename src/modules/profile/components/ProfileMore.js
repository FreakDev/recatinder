import React from 'react'

import Button from '../../ui/components/Button'

import './css/ProfileMore.css'

export const ProfileMore = ({profile, style, onClickBack}) => {
    
    const { name, age, description, distance, shareWith } = profile

    return (
        <div className="profile-more" style={ style }>
            <div className="row name-row">
                <p className="name-info">{ name }{ age ? ', ' + age : '' }</p>
                <p className="distance-info">
                    { distance ? 
                        <span> <i className="icon geo-pin" />{ distance } km </span> :
                        <span>&nbsp;</span>
                    }
                </p>
            </div>
            <div className="row share-row">
                <p><span className="share-info first-line">recommandez le chat { name }</span><span className="share-info second-line">à des { shareWith }</span></p>
            </div>
            <div className="row report-row">
                <p>signalez  { name }</p>
            </div>            
            <div className="row description-row">
                <span className="description-info">{ description }</span>
            </div>
            <Button icon="back" rounded onClick={ onClickBack } />
        </div>
    )
}

export default ProfileMore
