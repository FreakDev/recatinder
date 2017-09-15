import React from 'react'
import { connect } from 'react-redux'

import { default as Button } from '../../ui/components/BarButton'

import './css/ButtonsBar.css'

export const ButtonsBarCmp = ({ buttons, position }) => {
    const pos = position || 'down' 
    return (
        <div className={ "buttons bar row " + pos}>
            { buttons.map( (b, k) => (
                <Button key={ 'button=' + k } size={ k % 2 ? "" : "small" } icon={b} rounded subdiv={buttons.length} />
            )) }
        </div>        
    )
}

const mapStateToProps = state => {
    return {
        buttons: state.profileUI.buttons
    }
}

const Header = connect(mapStateToProps, null)(ButtonsBarCmp)

export default Header