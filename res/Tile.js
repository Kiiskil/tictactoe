const doom = 5;
let w = 30;

function Tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.locx = x/w;
    this.locy = y/w;

    this.used = false;
    this.class = null;

    this.hits= new Array(8);
    this.max_click = 0;

}

Tile.prototype.show = function(board) {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.used) {
        if(this.class == board.playerUno.name){
            fill(0);
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.5, this.w * 0.5)
        }
        else if(this.class == board.playerDeux.name){
            fill(171, 254, 45)
            ellipse(this.x+this.w * 0.5, this.y+this.w * 0.5, this.w * 0.5)
        }
        else {
            fill(0);
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.2, this.w * 0.2)
        }
    } 
}

Tile.prototype.press = function(player,board) {
    if(!this.used) {
            this.class = player.name;
            this.used = true;
            board.doom = doom;
    }
    else{
        board.doom--;
    }
}

Tile.prototype.checMax = function(player,tmp){
    if(tmp>this.max_click){
        this.max_click = tmp;
        player.points += this.max_click*pointsConn;
    }
}


Tile.prototype.win = function(player,player1,boardy){
    let name = player.name;
    let enemyName = player1.name;
    //console.log(board);
    player.winrow = 1;

    for(let i = this.locx-1;i < this.locx+1; i++){
        for(let j = this.locx-1; j < this.locy+1; j++){
            if(i < grid_size && i >=0 && j < grid_size && j >=0 && boardy.game[i][j].class == enemyName){
                this.hits.push(1);
            }
        }
    }

    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && boardy.game[this.locx+i][this.locy].class == null){break;}
        else if(this.locx+i < grid_size && boardy.game[this.locx+i][this.locy].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locx-i >= 0 && boardy.game[this.locx-i][this.locy].class == null){break;}
        else if(this.locx-i >= 0 && boardy.game[this.locx-i][this.locy].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    if(player.winrow >= winline){
        player.win = 1;
        gameOver(boardy,player,player1);
    }
    player.winrow = 1;
    for(let i=1; i < winline; i++){
        if(this.locy+i < grid_size && boardy.game[this.locx][this.locy+i].class == null){break;}
        else if(this.locy+i < grid_size && boardy.game[this.locx][this.locy+i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && boardy.game[this.locx][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && boardy.game[this.locx][this.locy-i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    if(player.winrow >= winline){
        player.win = 1;
        gameOver(boardy,player,player1);
    }
    player.winrow = 1;
    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && this.locy+i < grid_size && boardy.game[this.locx+i][this.locy+i].class == null){break;}
        else if(this.locx+i < grid_size && this.locy+i < grid_size && boardy.game[this.locx+i][this.locy+i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && this.locx-i >= 0 &&boardy.game[this.locx-i][this.locy-i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    if(player.winrow >= winline){
        player.win = 1;
        gameOver(boardy,player,player1);
    } 
    player.winrow = 1;
    for(let i=1; i < winline; i++){
        if(this.locy + i < grid_size && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy+i].class == null){break;}
        else if(this.locy + i < grid_size && this.locx-i >= 0 && boardy.game[this.locx-i][this.locy+i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    for(let i=1; i < winline; i++){
        if(this.locy-i >= 0 && this.locx+i < grid_size && boardy.game[this.locx+i][this.locy-i].class == null){break;}
        else if(this.locy-i >= 0 && this.locx+i < grid_size && boardy.game[this.locx+i][this.locy-i].class == name){
            player.winrow++;
            this.hits.push(1);
        }
    }
    if(player.winrow >= winline){
        player.win = 1;
        gameOver(boardy,player,player1);
    }
    player.winrow = 1;
    this.checMax(player,this.hits.length);

    if (boardy.doom == 0){
        boardy.doom = doom;
        gameOver(boardy,player,player1);
    }
}

