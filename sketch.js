//TIC-TAC-TOE
let grid;
let cols;
let rows;
let w = 30;
let turn;
//let grid_size= "<?php echo $_POST['grid_size']?>";
//let winline = "<?php echo $_POST['winline']?>";

function setup(){
    turn = "dX";
    createCanvas(grid_size * w + 1, grid_size * w + 1);
    cols = floor(width / grid_size);
    rows = floor(height / grid_size);
    grid = make2DArray(cols, rows);
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            grid[i][j] = new Tile(i * w, j * w, w);
        }
    }
}

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i=0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function mousePressed() {
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(grid[i][j].locx==floor(mouseX/w) && grid[i][j].locy == floor(mouseY/w)){
                grid[i][j].press(turn);
                grid[i][j].win(turn);
            }
        }
    }
    if(turn == "dX") {
        turn = "dO";
    }
    else {
        turn = "dX";
    }
    draw();
}

function gameOver(turn){
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            grid[i][j].used = true;
        }
    }
    console.log("Player " + turn + " wins!!!");
}

function draw(){
    noLoop();
    background(255);
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            grid[i][j].show();
        }
    }
}

