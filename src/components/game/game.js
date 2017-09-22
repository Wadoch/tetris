/**
 * Created by Wadoch on 18.09.2017.
 */

import React, { Component } from 'react';
import './game.css';

//  import block class
import Blocks from './Blocks';

//  main game component
class Game extends Component  {
    //  constructor
    constructor(props){
        super(props);

        this.generateBoard = this.generateBoard.bind(this);
        this.drawBlock = this.drawBlock.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endLevel = this.endLevel.bind(this);
        this.endGame = this.endGame.bind(this);

        this.state = {start: 0, board: [], level: 0, pos: 4};   //  start: 1 - go, 0 - stop; board: saved all blocks,
                                                                //  level: actual y-axis; pos: actual x-axis
    }

    //  on render set clear board
    componentWillMount() {
        this.generateBoard();
    }

    //  generate clear board
    generateBoard() {
        let board = new Array(20);
        for(let i = 0; i < 20; i++) {
            board[i] = new Array(10);
            for(let j = 0; j < 10; j++){
                board[i][j] = {exist: 0, color: 'rgb(255, 255, 255)'};
            }
        }

        this.setState({board: board});
    }

    //  draw block
    drawBlock(canvas, ctx, x) {
        x.draw(canvas, ctx, this.state.board, this.state.level, this.state.pos);
    }

    //  block can't go deeper
    endLevel(block) {
        this.props.onPoints(10);            //  add 10 points

        let board = this.state.board;       //  get actual board

        for(let i = 0; i < block.n; i++){
            for(let j = 0; j < block.n; j++){
                if(block.pattern[i][j].exist){
                    board[this.state.level + i][this.state.pos + j] = block.pattern[i][j];      //  save block to board
                }
            }
        }

        let x;          //  x: 1 - whole row with blocks, 0 - not
        for(let i = 0; i < 20; i++){
            x = 0;
            for(let j = 0; j < 10; j++){
                if(board[i][j].exist){
                    x = 1;
                }
                else{
                    x = 0;
                    break;
                }
            }
            if(x){
                this.props.onPoints(100);       //  add 100 points for row
                this.props.onFloors(1);         //  add 1 to destroyed floors
                for(let j = i; j > 0; j--){
                    board[j] = board[j-1];      //  clear row and move board down
                }
                for(let j = 0; j < 10; j++){
                    board[0][j] = {exist: 0, color: 'rgb(255, 255, 255)'};  //  set first row as clear
                }
            }
        }
        this.setState({board: board, level: 0, pos: 4});        //  save new board
    }

    //  main game method
    startGame() {
        let canvas = document.getElementById('game');       //  get canvas

        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');              //  get context
            let block = new Blocks();               //  actual block
            let nextBlock = new Blocks();           //  next block
            let that = this;
            let x;

            that.props.onNextBlock(nextBlock);      //  send next block to stats

            this.drawBlock(canvas, ctx, block);     //  draw actual block

            let Arrows = function(event){           //  function on key press
                switch(event.key){
                    case "ArrowLeft":       //  on left:
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos-1);   //  try to move block
                        if(x === 1){
                            that.setState({pos: that.state.pos-1});     //  save new position if possible
                        }
                        break;
                    case "ArrowRight":      //  on right:
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos+1);   //  try to move block
                        if(x === 1){
                            that.setState({pos: that.state.pos+1});     //  save new position if possible
                        }

                        break;
                    case "ArrowDown":       // on down:
                        x = block.movePattern(canvas, ctx, that.state.board, that.state.level+1, that.state.pos);   //  try to move block
                        if(x === 1){
                            that.setState({level: that.state.level+1});     //  save new position if possible
                        }
                        else if(x === 2){               //  when can't go deeper
                            that.endLevel(block);

                            block = nextBlock;          //  change blocks
                            nextBlock = new Blocks();   //  and get the new one

                            that.props.onNextBlock(nextBlock);      //  send next block to stats
                            x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos); //  check that is place for new block at top
                            if(x === 2) {
                                that.endGame(int, Arrows);      //  if not end game
                            }
                        }
                        break;
                    case "ArrowUp":         //  on up:
                        block.changePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos);   //  try to change pattern
                        break;
                    default:
                        break;
                }
            };

            let int = setInterval(function(){       //  change position on y-axis every 0,5sec
                x = block.movePattern(canvas, ctx, that.state.board, that.state.level+1, that.state.pos);       //  try to move block down
                if(x === 1){
                    that.setState({level: that.state.level+1});     //  set new y-axis position if possible
                }
                else if(x === 2){
                    that.endLevel(block);                           //  end turn if not possible

                    block = nextBlock;              //  change blocks
                    nextBlock = new Blocks();       //  and get new one

                    that.props.onNextBlock(nextBlock);      //  send next block to stats

                    x = block.movePattern(canvas, ctx, that.state.board, that.state.level, that.state.pos);     //  check that is place for new block at top
                    if(x === 2) {
                        that.endGame(int, Arrows);      //  if not end game
                    }
                }
            }, 500);


            window.addEventListener("keyup", Arrows);       //   set event on key pressed

        } else {
            // canvas-unsupported code here
        }
    }

    //  end game
    endGame(int, Arrows) {
        clearInterval(int);                             //  unset function in loop
        window.removeEventListener('keyup', Arrows);    //  unset event on key pressed
        alert('End Game\n' +                            //  info about statistics
            'score: ' + this.props.points +
            '\nfloors: ' + this.props.floors);
    }

    //  render
    render() {
        if(!this.state.start) {
            if(this.props.start){
                this.setState({start: 1});
                this.startGame();               //  start game
            }
        }
        return (<div>
            <canvas width="300" height="600" id="game" className="game"/>
        </div>);
    }
    }

export default Game;