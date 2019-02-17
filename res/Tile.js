function Tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.locx = x/w;
    this.locy = y/w;

    this.used = false;
    this.class = null;
    this.doom = 5;

    this.clikcs= new Array(8);
    this.max_click = 0;

}

Tile.prototype.show = function(player,player1) {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.used) {
        if(this.class == player.name){
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.5, this.w * 0.5)
        }
        else if(this.class == player1.name){
            ellipse(this.x+this.w * 0.5, this.y+this.w * 0.5, this.w * 0.5)
        }
        else {
            fill(0);
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.2, this.w * 0.2)
        }
    } 
}

Tile.prototype.press = function(player) {
    if(!this.used) {
            this.class = player.name;
            this.used = true;
    };
    //console.log("Location " + this.locx + " "+ this.locy + " " + this.class);
    //console.log("AAAAA"+this.class)
}

Tile.prototype.checMax = function(player,tmp){
    this.clikcs.forEach(click => {
        tmp += click; 
    })
    if(tmp>this.max_click){
        this.max_click = tmp;
        player.points += this.max_click*2;
    }
}
//Something is awfully awry here.
Tile.prototype.win = function(player,player1,boardy){
    let tmp = 0;
    name = player.name;
    let comp_board=boardy;
    //console.log(board);
    let k = 1;

    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && boardy.game[this.locx+i][this.locy].class == null){break;}
        else if(this.locx+i < grid_size && boardy.game[this.locx+i][this.locy].class == name){
            if(boardy.game[this.locx+i][this.locy].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[0] = 1;
            }
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locx-i >= 0 && boardy.game[this.locx-i][this.locy].class == null){break;}
        else if(this.locx-i >= 0 && boardy.game[this.locx-i][this.locy].class == name){
            if(boardy.game[this.locx-i][this.locy].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[1] = 1;
            }
        }
        //console.log("x: " + k )
        if(k == winline){
            console.log("X");
            player.win = 1;
            turn = player.name;
            gameOver(turn,boardy,player,player1);
        }
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locy+i < grid_size && boardy.game[this.locx][this.locy+i].class == null){break;}
        else if(this.locy+i < grid_size && boardy.game[this.locx][this.locy+i].class == name){
            if(boardy.game[this.locx][this.locy+i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[2] = 1;
            }
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && boardy.game[this.locx][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && boardy.game[this.locx][this.locy-i].class == name){
            if(boardy.game[this.locx][this.locy-i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[3] = 1;
            }
        }
        //console.log("y: " + k )
        if(k == winline){
            console.log("Y");
            player.win = 1;
            turn = player.name;
            gameOver(turn,boardy,player,player1);
        }
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && this.locy+i < grid_size && boardy.game[this.locx+i][this.locy+i].class == null){break;}
        else if(this.locx+i < grid_size && this.locy+i < grid_size && boardy.game[this.locx+i][this.locy+i].class == name){
            if(boardy.game[this.locx+i][this.locy+i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[4] = 1;
            }
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && this.locx-i >= 0 &&boardy.game[this.locx-i][this.locy-i].class == name){
            if(boardy.game[this.locx-i][this.locy-i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[5] = 1;
            }
        }
        //console.log("vasenakeno " + k )
        if(k == winline){
            console.log("YX");
            player.win = 1;
            turn = player.name;
            gameOver(turn,boardy,player,player1);
        }
        
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locy + i < grid_size && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy+i].class == null){break;}
        else if(this.locy + i < grid_size && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy+i].class == name){
            if(boardy.game[this.locx-i][this.locy+i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[6] = 1;
            }
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && this.locx+i < grid_size && boardy.game[this.locx+i][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && this.locx+i < grid_size && boardy.game[this.locx+i][this.locy-i].class == name){
            if(boardy.game[this.locx+i][this.locy-i].class == null){
                break;
            }
            else{
                k++;
                this.clikcs[7] = 1;
            }
        }
        //console.log("oikeakeno " + k )
        if(k == winline){
            player.win = 1;
            turn = player.name;
            console.log("XY");
            gameOver(turn,boardy,player,player1);
        }
    }
    k = 1;
    this.checMax(player,tmp);
    //console.log("Max CLICK!!"+this.max_click);
    //console.log("-----------------------------------")
    if (comp_board.game == boardy.game){
        this.doom--;
        if(this.doom == 0){
            this.doom = doom;
            gameOver("nada",boardy,player,player1);
        }
    }
    else {
        this.doom = doom;
    }
}

