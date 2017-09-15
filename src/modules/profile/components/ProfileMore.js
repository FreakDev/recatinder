import React from 'react'
import { connect } from 'react-redux'

import { expandProfile } from '../actions'

import Button from '../../ui/components/Button'

import './css/ProfileMore.css'

export const ProfileMoreCmp = ({profile, expanded, onClickBack}) => {
    
    const { name, age, description, distance } = Object.assign({}, {
        name:'...',
        age: '',
        distance: '',
        description: ''
    }, profile)
    return (
        <div className="profile-more">
            <div className="row name-row">
                <p className="name-info">{ name }, { age }</p>
                <p className="distance-info">
                    { distance ? 
                        <span> <i className="icon geo-pin" />{ distance } km </span> :
                        <span>&nbsp;</span>
                    }
                </p>
            </div>
            <div className="row share-row">
                <p><span className="share-info first-line">recommandez { name }</span><span className="share-info second-line">à des amis</span></p>
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
const mapStateToProps = state => {
    return {
        profile: state.profiles.current,
        expanded: state.profileUI.expanded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickBack: () => { dispatch(expandProfile(false)) }
    }
}

const ProfileMore = connect(mapStateToProps, mapDispatchToProps)(ProfileMoreCmp)

export default ProfileMore
