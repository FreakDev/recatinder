import React from 'react'
import { connect } from 'react-redux'

import { expandProfile } from '../actions'

import Button from '../../ui/components/Button'

import './css/ProfileMore.css'

export const ProfileMoreCmp = ({profile, expanded, onClickBack}) => {
    
    let distanceString = ''
    const { name, age, description } = Object.assign({}, {
        name:'...',
        age: '',
        description: ''
    }, profile)
    return (
        <div className="profile-more">
            <div className="row name-row">
                <span className="name-info">{ name }, { age }</span>
                <span className="distance-info"><i className="icon geo-pin" />{ distanceString }</span>
            </div>
                <div className="row share-row">
                <span className="share-info">recommandez { name }<br />a des amis</span>
            </div>
            <div className="row description-row">
                <span className="description-info">{ description }</span>
            </div>
            <Button icon="less" rounded onClick={ onClickBack } />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        profile: state.profiles.list[state.profiles.current],
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
