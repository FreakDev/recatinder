import React, { Component } from 'react'
import { connect } from 'react-redux'

import { default as Button } from '../../ui/components/BarButton'

import './css/ButtonsBar.css'

export class ButtonsBarCmp extends Component {
    constructor(props) {
        super(props)

        this._onClickButton = this._onClickButton.bind(this)
    }

    _onClickButton(e) {
        let btnName = e.target.className.replace('icon ', ''),
            method = 'on' + e.target.className.replace('icon ', '').substr(0,1).toUpperCase() + e.target.className.replace('icon ', '').substr(1)

        if (this.props[method]) {
            this.props[method]()
        }
    }

    render() {
        const pos = position || 'down' 
        const { buttons, position } = this.props
        return (
            <div className={ "buttons bar row " + pos}>
                { buttons.map( (b, k) => (
                    <Button key={ 'button=' + k } 
                            size={ k % 2 ? "" : "small" } 
                            icon={b} 
                            rounded 
                            subdiv={buttons.length}
                            onClick={ this._onClickButton } />
                )) }
            </div>        
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        buttons: state.profileUI.buttons
    }
}

const Header = connect(mapStateToProps, null)(ButtonsBarCmp)

export default Header