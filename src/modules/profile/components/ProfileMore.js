import React from 'react'
import { connect } from 'react-redux'

import Button from '../../ui/components/Button'

export const ProfileMoreCmp = ({profile}) => {
    
    let distanceString = ''
    const { name, age, description } = Object.assign({}, {
        name:'...',
        age: '',
        description: ''
    }, profile)
    return (
        <div className="App-profile-more">
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
        profile: state.profiles.list[state.profiles.current] 
    }
}

const ProfileMore = connect(mapStateToProps, null)(ProfileMoreCmp)

export default ProfileMore
