import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { setLocale } from '../../translation/actions'
import { setAnimal } from '../../profile/actions'


import './css/Home.css'

const HomeCmp = ({ onChats, onDogs }) => {
    return (
        <div className="App-home">
            <div className="background"></div>
            <div onClick={ onChats } className="btn chats"><span className="figure"></span><br /><span className="label">Chats (fr)</span></div>
            <div onClick={ onDogs } className="btn dogs"><span className="figure"></span><br /><span className="label">Dogs (en)</span></div>
            <div className="logo"></div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChats: () => { 
            dispatch(setLocale('fr_FR'))
            dispatch(setAnimal('cats'))
            dispatch(push('/feed'))
        },
        onDogs: () => { 
            dispatch(setLocale('en_EN'))
            dispatch(setAnimal('dogs'))
            dispatch(push('/feed'))
        }
    }
}

const Home = connect(null, mapDispatchToProps)(HomeCmp)

export default Home