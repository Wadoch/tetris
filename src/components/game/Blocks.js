/**
 * Created by Wadoch on 18.09.2017.
 */


/*TODO: change array to array of objects that contain: color and 1/0*/

let colorPattern = [
    "rgb(244, 66, 66)",
    "rgb(173, 173, 173)",
    "rgb(65, 226, 244)",
    "rgb(244, 241, 65)",
    "rgb(238, 65, 244)",
    "rgb(65, 82, 244)",
    "rgb(65, 244, 88)"];

let patterns = [
    [[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[0]},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[1]},{exist: 0, color: 'rgb(255, 255, 255)'}], [{exist: 1, color: colorPattern[1]},{exist: 1, color: colorPattern[1]},{exist: 1, color: colorPattern[1]}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 1, color: colorPattern[2]},{exist: 1, color: colorPattern[2]}],[{exist: 1, color: colorPattern[2]},{exist: 1, color: colorPattern[2]}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[3]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[3]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'}, {exist: 1, color: colorPattern[3]},{exist: 1, color: colorPattern[3]}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 1, color: colorPattern[4]},{exist: 1, color: colorPattern[4]},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[5]},{exist: 1, color: colorPattern[5]}],[{exist: 1, color: colorPattern[5]},{exist: 1, color: colorPattern[5]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]],
    [[{exist: 1, color: colorPattern[6]},{exist: 1, color: colorPattern[6]},{exist: 0, color: 'rgb(255, 255, 255)'}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 1, color: colorPattern[6]},{exist: 1, color: colorPattern[6]}],[{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'},{exist: 0, color: 'rgb(255, 255, 255)'}]]];

class Block {
    constructor(){
        this.pattern = [];
        this.color = "";
        this.n = 0;
        this.random();
    }

    draw(canvas, ctx, board, level, pos){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 10; j++){
                if(board[i][j].exist){
                    ctx.fillStyle = board[i][j].color;
                    ctx.fillRect(30*j, 30*i, 30, 30);
                }
            }
        }

        ctx.fillStyle = this.color;

        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.n; j++){
                if(this.pattern[i][j].exist){
                    ctx.fillRect(pos*30+30*j, level*30+30*i, 30, 30);
                }
            }
        }
    }

    changePattern(canvas, ctx, board, level, pos){
        if(this.n === 3){
            let pat = new Array(this.n);
            let x = 0;

            for(let i = 0; i < this.n; i++){
                pat[i] = new Array(this.n);
            }

            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.n; j++){
                    if(level+j < 20 && level+j >= 0){
                        if(pos+2-i < 10 && pos+2-i >= 0){
                            if(!board[level + j][pos + 2-i].exist){
                                pat[j][2-i] = this.pattern[i][j];
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
            if(x !== 1){
                this.pattern = pat;
            }
        }
        else if(this.n === 4){
            let pat = new Array(this.n);
            let x = 0;

            for(let i = 0; i < this.n; i++){
                pat[i] = new Array(this.n);
            }

            for(let i = 0; i < this.n; i++){
                for(let j = 0; j < this.n; j++){
                    pat[j][3-i] = this.pattern[i][j];
                }
            }

            if(x !== 1){
                console.log('X');
                this.pattern = pat;
            }
        }
        this.draw(canvas, ctx, board, level, pos);
    }

    movePattern(canvas, ctx, board, level, pos){
        let x = 0;
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.n; j++){
                if(this.pattern[i][j].exist){
                    if(pos+j < 10 && pos+j >= 0){
                        if(level+i < 20 && level+i >= 0) {
                            if (!board[level + i][pos + j].exist) {
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

        if(x === 1){
            this.draw(canvas, ctx, board, level, pos);
            return 1;
        }
        else if(x === 2){
            //  end of this turn
            return 2;
        }
    }

    random(){
        let x = Math.floor(Math.random()*7);

        this.pattern = patterns[x];
        this.color = colorPattern[x];
        if(x === 0){
            this.n = 4;
        }
        else if(x === 2){
            this.n = 2;
        }
        else{
            this.n = 3;
        }

    }
}

export default Block;