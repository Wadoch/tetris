import React, { Component } from 'react';
import './App.css';

import Game from '../game';
import Stats from '../stats';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {ready: 0};
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart(e){
    this.setState({ready: e});
  }

  render() {
    return (
      <div className="App">
        <Stats className="App-box" onStart={this.handleStart} />
        <Game className="App-box" start={this.state.ready} />
      </div>
    );
  }
}

export default App;
