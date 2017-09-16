import React from 'react'
import { connect } from 'react-redux'

import { expandProfile } from '../actions'

import Button from '../../ui/components/Button'

import './css/Overlay.css'

export const OveralyCmp = (props) => {
    const { name, age, onClick } = Object.assign({
        name: 'Mellys',
        age: '',
    }, props)
    return (
        <div className="overlay" onClick={ onClick }>
            <span className="name-info">{ name }, { age }</span>
            <Button rounded size="smaller" style={{ color: 'black' }} >i</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: () => dispatch(expandProfile())
    }
}

const Overaly = connect(null, mapDispatchToProps)(OveralyCmp)

export default Overaly