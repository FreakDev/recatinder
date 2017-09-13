import React from 'react'

const Button = ({ icon, rounded }) => (
    <div className={ 'button ' + (rounded ? 'rounded' : '') } >
        <i className={ 'icon ' + icon } />
    </div>
)

export default Button