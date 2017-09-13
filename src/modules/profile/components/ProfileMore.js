import React from 'react'
import { connect } from 'react-redux'

import Button from '../../ui/components/Button'

export const ProfileMoreCmp = ({profile, expanded}) => {
    
    let distanceString = ''
    const { name, age, description } = Object.assign({}, {
        name:'...',
        age: '',
        description: ''
    }, profile)
    let opacity = expanded ? 1 : 0;
    return (
        <div className="App-profile-more" style={{ opacity }}>
            <div className="row">
                <span className="name-info">{ name }, { age }</span>
                <span className="distance-info"><i className="icon geo-pin" />{ distanceString }</span>
            </div>
                <div className="row">
                <span className="share-info">recommandez { name }<br />a des amis</span>
            </div>
            <div className="row">
                <span className="description-info">{ description }</span>
            </div>
            <Button icon="less" rounded />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        profile: state.profiles.list[state.profiles.current],
        expanded: state.profileUI.expanded
    }
}

const ProfileMore = connect(mapStateToProps, null)(ProfileMoreCmp)

export default ProfileMore
