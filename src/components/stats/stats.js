/**
 * Created by Wadoch on 18.09.2017.
 */
import React, { Component } from 'react';
import './stats.css';

//  class that conatain whole information: title, score, floors, next block
class Stats extends Component{
    constructor(props){
        super(props);

        this.startGame = this.startGame.bind(this);
        this.nextBlock = this.nextBlock.bind(this);
    }

    //  update ready state at component App on button click
    startGame(){
        this.props.onStart(1);
    }

    //  draw next button
    nextBlock(){
        let canvas = document.getElementById('nextBlock');  //  get canvas

        if(canvas.getContext){
            let ctx = canvas.getContext('2d');      //  get context of canvas

            ctx.clearRect(0, 0, canvas.width, canvas.height);       //  clear canvas

            ctx.fillStyle = this.props.nextBlock.color;     //  change color of block
            ctx.strokeStyle = 'black';                      //  change color of border of block

            for(let i = 0; i < this.props.nextBlock.n; i++){
                for(let j = 0; j < this.props.nextBlock.n; j++){
                    if(this.props.nextBlock.pattern[i][j].exist){       //  generate the block
                        if(this.props.nextBlock.n <= 3){                //
                            ctx.fillRect(30*j, 30+30*i, 30, 30);        //
                            ctx.strokeRect(30*j, 30+30*i, 30, 30);      //
                        }                                               //
                        else if(this.props.nextBlock.n === 4){          //
                            ctx.fillRect(30*j, 30*i, 30, 30);           //
                            ctx.strokeRect(30*j, 30*i, 30, 30);         //  ^^
                        }
                    }
                }
            }
        }
    }

    //  render
    render() {
        if(this.props.ready){   //  generate next button on pressed start button
            this.nextBlock();
        }
        return (<div className="App-box">
            <div className="score">
                <div><h1>TETRIS</h1></div>
                <div><canvas id="nextBlock" width="90" height="120"/></div>
                <div>SCORE: <div id="score">{this.props.points}</div></div>
                <div> FLOORS: <div id="floors">{this.props.floors}</div></div>
                <div><button id="startBtn" onClick={this.startGame}>START</button></div>
            </div>
        </div>);
    }
}

export default Stats;