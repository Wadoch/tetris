/**
 * Created by Wadoch on 18.09.2017.
 */

import React, { Component } from 'react';
import './game.css';
import Blocks from './Blocks';

class Game extends Component  {
    constructor(props){
        super(props);
        this.generateBoard = this.generateBoard.bind(this);
        this.drawBlock = this.drawBlock.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endLevel = this.endLevel.bind(this);
        this.state = {start: 0, board: [], level: 0, pos: 4};
    }

    componentWillMount() {
        this.generateBoard();
    }

    generateBoard() {
        let board = Array(20);
        for(let i = 0; i < 20; i++) {
            board[i] = Array(10);
            for(let j = 0; j < 10; j++){
                board[i][j] = {exist: 0, color: 'rgb(255, 255, 255)'};
            }
        }

        this.setState({board: board});
    }


    drawBlock(canvas, ctx, x) {
        x.draw(canvas, ctx, this.state.board, this.state.level, this.state.pos);
    }

    endLevel(){

    }

    startGame() {
        let canvas = document.getElementById('game');

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            let block = new Blocks();
            let that = this;
            let x;
            window.addEventListener("keyup", function(event){
                switch(event.key){
                    case "ArrowLeft":
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos-1);
                        if(x === 1){
                            that.setState({pos: that.state.pos-1});
                        }
                        break;
                    case "ArrowRight":
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos+1);
                        if(x === 1){
                            that.setState({pos: that.state.pos+1});
                        }

                        break;
                    case "ArrowDown":
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level+1, that.state.pos);
                        if(x === 1){
                            that.setState({level: that.state.level+1});
                        }
                        else if(x === 2){
                            that.endLevel();

                            let board = that.state.board;
                            console.log(board);
                            for(let i = 0; i < block.n; i++){
                                for(let j = 0; j < block.n; j++){
                                    if(block.pattern[i][j].exist){
                                        board[that.state.level + i][that.state.pos + j] = block.pattern[i][j];
                                    }
                                }
                            }

                            that.setState({board: board, level: 0, pos: 4});
                            block = new Blocks();
                            that.drawBlock(canvas, ctx, block);
                        }
                        break;
                    case "ArrowUp":
                        block.changePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos);
                        break;
                    default:
                        break;
                }
            });

            this.drawBlock(canvas, ctx, block);

        } else {
            // canvas-unsupported code here
        }
    }

    render() {
        if(!this.state.start) {
            if(this.props.start){
                this.setState({start: 1});
                this.startGame();
            }
        }
        return (<div>
            <canvas width="300" height="600" id="game" className="game"/>
        </div>);
    }
    }

export default Game;