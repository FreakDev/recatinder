import React from 'react'

import Button from './Button'

const BarButton = (props) => {
    return (
        <div className={ 'cell cell-' + props.subdiv } >
            <Button { ...props } />
        </div>
    )
}

export default BarButton