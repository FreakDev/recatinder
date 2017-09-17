import React, { Component } from 'react';
import { Provider } from 'react-redux'

import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from './store'

import Header from './modules/ui/components/Header'
import Home from './modules/home/components/Home'

import Profile from './modules/profile/components/Profile'

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={ history } >
        <div className="App">
          <Header />
          <Route exact path="/profile" component={Home} />
          <Route exact path="/feed" component={Profile} />
        </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
