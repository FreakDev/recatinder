import React from 'react'

import './css/Button.css'

const Button = ({ icon, rounded, style, size, children }) => (
    <div className={ ['button', (rounded ? 'rounded' : ''), (size ? size : '') ].join(' ') } style={style} >
        {icon ? 
        <i className={ 'icon ' + icon } />
        :
        children }
    </div>
)

export default Button