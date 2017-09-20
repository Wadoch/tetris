/**
 * Created by Wadoch on 18.09.2017.
 */
import React, { Component } from 'react';
import './stats.css';

class Stats extends Component{
    constructor(props){
        super(props);
        this.startGame = this.startGame.bind(this);
    }

    startGame(){
        this.props.onStart(1);
    }

    render() {
        return (<div className="App-box">
            <div className="score">
                <div id="nextBlock"><canvas id="nextBlock"/></div>
                <div>SCORE: <div id="score">0</div></div>
                <div> FLOORS: <div id="floors">0</div></div>
                <div><button id="startBtn" onClick={this.startGame}>START</button></div>
            </div>
        </div>);
    }
}

export default Stats;