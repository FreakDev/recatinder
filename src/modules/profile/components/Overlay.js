import React from 'react'
import { connect } from 'react-redux'

import Button from '../../ui/components/Button'

import './css/Overlay.css'

export const OveralyCmp = (props) => {
    const { name, age } = Object.assign({
        name: 'Mellys',
        age: ''
    }, props)
    return (
        <div className="overlay">
            <span className="name-info">{ name }, { age }</span>
            <Button rounded size="smaller" style={{ color: 'black' }} >i</Button>
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