//TIC-TAC-TOE
//Basic Tic-Tac-Toe
//Made with PHP, JS (P5 -library) and Toy-Neural-Network by Coding Train 
//PHP for getting grid size and amount required for the win from the user.
//Toy-Neural-Network by Coding Train https://github.com/CodingTrain/Toy-Neural-Network-JS
let grid;
let cols;
let rows;
let w = 30;
let turn;
let brain;

let grid_size = 15;
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

    //NeuralNetwork(inputs,hidden layers, outputs)
    //NeuralNetwork(array of numbers, preferable normalized between zero and one, 3 hidden layers(?) and x,y value as output)
    brain = new NeuralNetwork(grid_size*grid_size,3,2);
}

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i=0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

function gridizise(arr){
    let arr_new = new Array(grid_size*grid_size);
    let ind_new = 0;
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(grid[i][j].class == null){
                arr_new[ind_new] = 0;
            }
            else if(grid[i][j].class == "dX"){
                arr_new[ind_new] = 0.5;
            }
            else if(grid[i][j].class == "dO"){
                arr_new[ind_new] = 1;
            }
            ind_new++;
        }
    }
}

function NN(gridi){
    let inputs = gridizise(gridi);
    let outputs = brain.predict(inputs);
    console.log(outputs);  
}

//Function, that makes essentially the same as mousePressed, but for NeuralNetwork, as it returns x,y-values as outputs
function nnMouse(x,y){

    if(turn = "dO"){
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(grid[i][j].locx==floor(x) && grid[i][j].locy == floor(y)){
                    grid[i][j].press(turn);
                    grid[i][j].win(turn);
                }
            }
        }
        /* if(turn == "dX") {
            turn = "dO";
        }
        else {
            turn = "dX";
        } */
        draw();
        turn = "dX"
    }
    NN(grid);
}

function mousePressed() {
    nnMouse(floor(mouseX/w),floor(mouseY/w));
    if(turn == "dX"){
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(grid[i][j].locx==floor(mouseX/w) && grid[i][j].locy == floor(mouseY/w)){
                    grid[i][j].press(turn);
                    grid[i][j].win(turn);
                }
            }
        }
        /* if(turn == "dX") {
            turn = "dO";
        }
        else {
            turn = "dX";
        } */
        draw();
        turn = "dO"
    }
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
    document.getElementById("turn_screen").innerHTML = turn
    //gridizise(grid);
}

