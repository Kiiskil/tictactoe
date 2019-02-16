function Tile(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.locx = x/w;
    this.locy = y/w;

    this.used = false;
    this.class = null;
}

Tile.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.used) {
        if(this.class == "dX"){
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.5, this.w * 0.5)
        }
        else if(this.class == "dO"){
            ellipse(this.x+this.w * 0.5, this.y+this.w * 0.5, this.w * 0.5)
        }
        else {
            fill(0);
            rect(this.x+this.w * 0.25, this.y+this.w * 0.25, this.w * 0.2, this.w * 0.2)
        }
    } 
}

Tile.prototype.press = function(turn) {
    if(!this.used) {
        this.class = turn;
        this.used = true;
    };
    console.log("Location " + this.locx + " "+ this.locy + " " + this.class);
}

Tile.prototype.win = function(turn){
    let k = 0;
    for(let i=1; i < winline; i++){
        if(this.locx+i < grid_size && grid[this.locx+i][this.locy].class == turn && grid[this.locx+i][this.locy].class != null){
            k++;
        }
        if(this.locx-i >= 0 && grid[this.locx-i][this.locy].class == turn && grid[this.locx-i][this.locy].class != null){
            k++;
        }
        console.log("x: " + k )
        if(k == winline){
            gameOver(turn);
        }
        else { k = 0;}
        if(this.locy < grid_size && grid[this.locx][this.locy+i].class == turn && grid[this.locx][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && grid[this.locx][this.locy-i].class == turn && grid[this.locx][this.locy-i].class != null){
            k++;
        }
        console.log("y: " + k )
        if(k == winline){
            gameOver(turn);
        }
        else { k = 0;}
        if(this.locx+i < grid_size && this.locy+i < grid_size && grid[this.locx+i][this.locy+i].class == turn && grid[this.locx+i][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && this.locx-i >= 0 &&grid[this.locx-i][this.locy-i].class == turn && grid[this.locx-i][this.locy-i].class != null){
            k++;
        }
        console.log("oikeakeno " + k )
        if(k == winline){
            gameOver(turn);
        }
        else { k = 0;}
        if(this.locy + i < grid_size && this.locx-i >= 0 && grid[this.locx-i][this.locy+i].class == turn && grid[this.locx-i][this.locy+i].class != null){
            k++;
        }
        if(this.locy-i >= 0 && this.locx+i < grid_size && grid[this.locx+i][this.locy-i].class == turn && grid[this.locx+i][this.locy-i].class != null){
            k++;
        }
        console.log("vasenkeno " + k )
        if(k == winline){
            gameOver(turn);
        }
        else { k = 0;}
    }
}