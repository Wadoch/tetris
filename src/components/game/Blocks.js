/**
 * Created by Wadoch on 18.09.2017.
 */

//  blocks colors
let colorPattern = [
    "#e40013",
    "#ff5f3c",
    "#fcf651",
    "#00bc38",
    "#009df8",
    "#08077b",
    "#320993"];

//  all 7 patterns of blocks with colors (I, T, O, L, J, S, Z)
let patterns = [
    [[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[1]},{exist: 0, color: 'rgb(255, 255, 255)'}], [{exist: 1, color: colorPattern[1]},{exist: 1, color: colorPattern[1]},{exist: 1, color: colorPattern[1]}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 1, color: colorPattern[2]},{exist: 1, color: colorPattern[2]}],[{exist: 1, color: colorPattern[2]},{exist: 1, color: colorPattern[2]}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[3]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[3]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[3]},{exist: 1, color: colorPattern[3]}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 1, color: colorPattern[4]},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[5]},{exist: 1, color: colorPattern[5]}],[{exist: 1, color: colorPattern[5]},{exist: 1, color: colorPattern[5]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 1, color: colorPattern[6]},{exist: 1, color: colorPattern[6]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[6]},{exist: 1, color: colorPattern[6]}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]]];

//  class that operate on single block
class Block {
    //  constructor
    constructor(){
        this.pattern = [];      //  block pattern
        this.color = "";        //  block color
        this.n = 0;             //  number of single points in row
        this.random();          //  generate random block
    }

    //  draw block
    draw(canvas, ctx, board, level, pos){
        ctx.clearRect(0, 0, canvas.width, canvas.height);       //  clear canvas

        for(let i = 0; i < 20; i++){                        //  draw all blocks that are already saved
            for(let j = 0; j < 10; j++){                    //
                if(board[i][j].exist){                      //  check that block exist on this position
                    ctx.fillStyle = board[i][j].color;      //  set block color
                    ctx.strokeStyle = 'black';              //  set color border of block
                    ctx.fillRect(30*j, 30*i, 30, 30);       //  draw
                    ctx.strokeRect(30*j, 30*i, 30, 30);     // ^^
                }
            }
        }

        ctx.fillStyle = this.color;         //  set actual block color
        ctx.strokeStyle = 'black';          //  set border

        for(let i = 0; i < this.n; i++){                                    //  draw actual block
            for(let j = 0; j < this.n; j++){                                //
                if(this.pattern[i][j].exist){                               //
                    ctx.fillRect(pos*30+30*j, level*30+30*i, 30, 30);       //
                    ctx.strokeRect(pos*30+30*j, level*30+30*i, 30, 30);     //  ^^
                }
            }
        }
    }

    //  rotate block
    changePattern(canvas, ctx, board, level, pos){
        if(this.n === 3){           //  for n = 3
            let pat = new Array(this.n);        //  save rotated pattern
            let x = 0;                          //  x: 0 - all good, 1 - error

            for(let i = 0; i < this.n; i++){
                pat[i] = new Array(this.n);
            }

            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.n; j++){
                    if(level+j < 20 && level+j >= 0){                       //  check that new block is in board
                        if(pos+2-i < 10 && pos+2-i >= 0){                   //  ^^
                            if(!board[level + j][pos + 2-i].exist){
                                pat[j][2-i] = this.pattern[i][j];           //  rotation: x: j-i, y: 2-j-i
                            }
                            else{
                                x = 1;
                                break;
                            }
                        }
                        else{
                            x = 1;
                            break;
                        }
                    }
                    else{
                        x = 1;
                        break;
                    }
                }
            }
            if(x !== 1){                //  save rotated pattern when all was alright
                this.pattern = pat;
            }
        }
        else if(this.n === 4){              //  for n = 4
            let pat = new Array(this.n);    //  save rotated pattern
            let x = 0;                      //  x: 0 - all good, 1 - error

            for(let i = 0; i < this.n; i++){
                pat[i] = new Array(this.n);
            }

            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.n; j++){
                    if(level+j < 20 && level+j >= 0){                   //  check that new block is in board
                        if(pos+3-i < 10 && pos+3-i >= 0){               //  ^^
                            if(!board[level + j][pos + 3-i].exist){
                                pat[j][3-i] = this.pattern[i][j];       //  rotation: x: j-i, y: 2-j-i
                            }
                            else{
                                x = 1;
                                break;
                            }
                        }
                        else{
                            x = 1;
                            break;
                        }
                    }
                    else{
                        x = 1;
                        break;
                    }
                }
            }

            if(x !== 1){                //  save rotated pattern when all was alright
                this.pattern = pat;
            }
        }

        this.draw(canvas, ctx, board, level, pos);      //  draw new block
    }

    //  move block to new position
    movePattern(canvas, ctx, board, level, pos){
        let x = 0;      //  x: 1 - all good, 2 - block stopped, 0 - block outside of board

        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.n; j++){
                if(this.pattern[i][j].exist){                           //  when block exist in this position
                    if(pos+j < 10 && pos+j >= 0){                       //  check that block is still in board
                        if(level+i < 20 && level+i >= 0) {              //  ^^
                            if (!board[level + i][pos + j].exist) {     //  and check there wasn't any saved block
                                x = 1;
                            } else {
                                x = 2;
                                break;
                            }
                        } else{
                            x = 2;
                            break;
                        }
                    } else{
                        x = 0;
                        break;
                    }
                } else{
                    x = 1;
                }
            }
            if(!x || x === 2){
                break;
            }
        }

        if(x === 1){                    //  draw when all is fine
            this.draw(canvas, ctx, board, level, pos);
            return 1;
        }
        else if(x === 2){               //  end of this turn
            return 2;
        }
    }

    //  generate new random block
    random(){
        let x = Math.floor(Math.random()*7);

        this.pattern = patterns[x];     //  save new pattern
        this.color = colorPattern[x];   //  save color
        if(x === 0){            //  set number of max blocks
            this.n = 4;
        }
        else if(x === 2){       //  ^^
            this.n = 2;
        }
        else{                   //  ^^
            this.n = 3;
        }

    }
}

export default Block;