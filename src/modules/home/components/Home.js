import React from 'react'
import { connect } from 'react-redux'
import { history } from '../../../store'

import { setLocale } from '../../translation/actions'
import { setAnimal } from '../../profile/actions'


import './css/Home.css'

const HomeCmp = ({ onChats, onDogs }) => {
    return (
        <div className="App-home">
            <div className="background"></div>
            <div onClick={ onChats } className="btn chats"><span className="figure">&nbsp;</span><br /><span className="label">Chats (fr)</span></div>
            <div onClick={ onDogs } className="btn dogs"><span className="figure">&nbsp;</span><br /><span className="label">Dogs (en)</span></div>
            <div className="logo"></div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChats: () => { 
            dispatch(setLocale('fr_FR'))
            dispatch(setAnimal('cats'))
            history.push('/feed')
        },
        onDogs: () => { 
            dispatch(setLocale('en_EN'))
            dispatch(setAnimal('dogs'))
            history.push('/feed')
        }
    }
}

const Home = connect(null, mapDispatchToProps)(HomeCmp)

export default Home