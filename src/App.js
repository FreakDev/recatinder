import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './store'

import Header from './modules/ui/components/Header'

import Profile from './modules/profile/components/Profile'


import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Profile />
        </div>
      </Provider>
    );
  }
}

export default App;
