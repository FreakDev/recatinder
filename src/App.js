import React, { Component } from 'react';
import { Provider } from 'react-redux'

import { HashRouter, Route, Redirect } from 'react-router-dom'

import store, { history } from './store'

import Header from './modules/ui/components/Header'
import Home from './modules/home/components/Home'

import Profile from './modules/profile/components/Profile'

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter history={ history } >
        <div className="App">
          <Header />
          <Route path="/profile" component={Home} />
          <Route path="/feed" component={Profile} />
          <Redirect from="/" to="/profile" />
        </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
