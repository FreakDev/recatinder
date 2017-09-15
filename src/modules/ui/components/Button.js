import React from 'react'

import './css/Button.css'

const Button = ({ icon, rounded, style, size, children, onClick }) => (
    <div className={ ['button', (rounded ? 'rounded' : ''), (size ? size : '') ].join(' ') } 
         style={style}
         onClick={ onClick || null } >
        {icon ? 
        <i className={ 'icon ' + icon } />
        :
        children }
    </div>
)

export default Button