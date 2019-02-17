function Tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.locx = x/w;
    this.locy = y/w;

    this.used = false;
    this.class = null;
    this.doom = 5;

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

Tile.prototype.press = function() {
    if(!this.used) {
            this.class = turn;
            this.used = true;
    };
    //console.log("Location " + this.locx + " "+ this.locy + " " + this.class);
    console.log("AAAAA"+this.class)
}

Tile.prototype.win = function(player,board){
    name = player.name;
    let comp_board=board;
    console.log(board);
    let k = 1;

    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && board.game[this.locx+i][this.locy].class == name && board.game[this.locx+i][this.locy].class != null){
            k++;
        }
        if(this.locx-i >= 0 && board.game[this.locx-i][this.locy].class == name && board.game[this.locx-i][this.locy].class != null){
            k++;
        }
        console.log("x: " + k )
        if(k == winline){
            gameOver(name);
        }
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locy+i < grid_size && board.game[this.locx][this.locy+i].class == name && board.game[this.locx][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && board.game[this.locx][this.locy-i].class == name && board.game[this.locx][this.locy-i].class != null){
            k++;
        }
        //console.log("y: " + k )
        if(k == winline){
            gameOver(name);
        }
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && this.locy+i < grid_size && board.game[this.locx+i][this.locy+i].class == name && board.game[this.locx+i][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && this.locx-i >= 0 &&board.game[this.locx-i][this.locy-i].class == name && board.game[this.locx-i][this.locy-i].class != null){
            k++;
        }
        //console.log("vasenakeno " + k )
        if(k == winline){
            gameOver(name);
        }
        
    }
    k = 1;
    for(let i=1; i < winline; i++){
        if(this.locy + i < grid_size && this.locx-i >= 0 && board.game[this.locx-i][this.locy+i].class == name && board.game[this.locx-i][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && this.locx+i < grid_size && board.game[this.locx+i][this.locy-i].class == name && board.game[this.locx+i][this.locy-i].class != null){
            k++;
        }
        //console.log("oikeakeno " + k )
        if(k == winline){
            gameOver(name);
        }
    }
    k = 1;
    //console.log("-----------------------------------")
    if (comp_board.game == board.game){
        this.doom--;
        if(this.doom == 0){
            this.doom = 5;
            gameOver("nada");
        }
    }
    else {
        this.doom = 5;
    }
}

