import React from 'react'
import { connect } from 'react-redux'

import Button from '../../ui/components/Button'

export const OveralyCmp = (props) => {
    const { name, age } = Object.assign({
        name: '...',
        age: ''
    }, props)
    return (
        <div className="overlay">
            <span className="name-info">{ name }, { age }</span>
            <Button rounded icon="more" />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ...state.profiles[state.profiles.current]
    }
}

const Overaly = connect(mapStateToProps, null)(OveralyCmp)

export default Overaly