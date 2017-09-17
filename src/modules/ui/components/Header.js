import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { default as Button } from './BarButton'

import './css/Header.css'

export const HeaderCmp = ({ buttons }) => {
    return (
        <div className="App-header bar row">
            { buttons.map( (b, k) => (
                <Link key={ 'header-link-' + k } to={ "/" + b }>
                    <Button key={ 'header-btn-' + k } icon={b} subdiv={buttons.length} />
                </Link>
            )) }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        buttons: state.ui.header
    }
}

const Header = connect(mapStateToProps, null)(HeaderCmp)

export default Header