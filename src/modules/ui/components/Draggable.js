import React, { Component } from 'react'

import './css/Draggable.css'

class Draggable extends Component {

    render() {
        return (
            <div className="draggable-frame">
                <div className="draggable">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default Draggable