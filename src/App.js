import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div classNane="cell cell-3">
            <i className="icon profile" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon fire" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon tchat" />
          </div>
        </div>
        <div className="App-profile">
          <div className="draggable-component">
            <div className="photos">
              <ul className="navigator">
                <li className="navigator-tab">&nbsp;</li>
                <li className="navigator-tab">&nbsp;</li>
                <li className="navigator-tab">&nbsp;</li>
              </ul>
              <div className="navigator-content"></div>
              <div className="navigator-content"></div>
              <div className="navigator-content"></div>
            </div>
            <div className="info">
              <span className="name-info">Prénom, age</span>
              <i className="icon info" />
            </div>
          </div>
          <div className="App-profile-more">
            <div className="row">
              <span className="name-info">Prénom, age</span>
              <span className="distance-info"><i className="icon geo-pin" />à moins d'un kilomètre</span>
            </div>
            <div className="row">
              <span className="share-info">recommandez Prénom<br />a des amis</span>
            </div>
            <div className="row">
              <span className="description-info">description</span>
            </div>
            <div className="button-less">
              <i className="icon arrow-down" />
            </div>
          </div>
          <div className="App-button-bar">
          <div classNane="cell cell-3">
            <i className="icon refresh" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon red-cross" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon star" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon heart" />
          </div>
          <div classNane="cell cell-3">
            <i className="icon lightning" />
          </div>            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
