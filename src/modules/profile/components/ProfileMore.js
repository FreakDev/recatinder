import React from 'react'
import { connect } from 'react-redux'

import Button from '../../ui/components/Button'

import { getTranslate } from '../../translation'

import './css/ProfileMore.css'

export const ProfileMoreCmp = ({profile, style, onClickBack, translate}) => {
    
    const { name, age, description, distance, shareWith } = profile

    return (
        <div className="profile-more" style={ style }>
            <div className="row name-row">
                <p className="name-info">{ name }{ age ? ', ' + age : '' }</p>
                <p className="distance-info">
                    { distance ? 
                        <span> <i className="icon geo-pin" />{ distance } {translate('more_dist_unit')}</span> :
                        <span>&nbsp;</span>
                    }
                </p>
            </div>
            <div className="row share-row">
                <p><span className="share-info first-line">{translate('more_recommend')} { name }</span><span className="share-info second-line">{ translate('more_to')} { shareWith }</span></p>
            </div>
            <div className="row report-row">
                <p>{translate('more_report')} { name }</p>
            </div>            
            <div className="row description-row">
                <span className="description-info">{ description }</span>
            </div>
            <Button icon="back" rounded onClick={ onClickBack } />
        </div>
    )
}

const ProfileMore = connect(state => {
    return {
        translate: getTranslate(state)
    }
}, null)(ProfileMoreCmp)

export default ProfileMore
