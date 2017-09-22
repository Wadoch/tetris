/* MAIN COMPONENT */
import React, { Component } from 'react';
import './App.css';

//  import all components
import Game from '../game';
import Stats from '../stats';

//  class App that contain all of components
class App extends Component {
  //  constructor
  constructor(props){
    super(props);
    this.state = {ready: 0, nextBlock: {}, points: 0, floors: 0}; //  ready: 1 - start game, nextBlock - object with next block,
                                                                  //  points - actual points, floors - destroyed floors
    this.handleStart = this.handleStart.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleFloors = this.handleFloors.bind(this);
    this.handlePoints = this.handlePoints.bind(this);
  }

  //  method that update state when user click on start button
  handleStart(e){
    this.setState({ready: e});
  }

  //  method that update canvas with next block
  handleNext(e){
    this.setState({nextBlock: e});
  }

  //  method that update points
  handlePoints(e){
    let newP = this.state.points + e;
    this.setState({points: newP});
  }

  //  method that update floors
  handleFloors(e){
    let newF = this.state.floors + e;
    this.setState({floors: newF});
  }

  //  render
  render() {
    return (
          <div className="App">
            <Stats className="App-box" floors={this.state.floors} points={this.state.points} ready={this.state.ready} nextBlock={this.state.nextBlock} onStart={this.handleStart} />
            <Game className="App-box" floors={this.state.floors} points={this.state.points} onFloors={this.handleFloors} onPoints = {this.handlePoints} onNextBlock={this.handleNext} start={this.state.ready} />
          </div>
    );
  }
}

export default App;
