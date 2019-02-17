//TIC-TAC-TOE
//Basic Tic-Tac-Toe
//Made with PHP, JS (P5 -library) and Toy-Neural-Network by Coding Train 
//PHP for getting boardNN.game size and amount required for the win from the user.
//Toy-Neural-Network by Coding Train https://github.com/CodingTrain/Toy-Neural-Network-JS

let cols;
let rows;
let w = 30;
let turn = "myPlayer";
let brain;
let mypoints;
let myTurn = true;
let myName;
let colony = 50;

let points_symb = 0.5;

const grid_size = 15;
const winline = 5;
//let boardNN.game_size= "<?php echo $_POST['boardNN.game_size']?>";
//let winline = "<?php echo $_POST['winline']?>";

function setup(){
    noLoop();
    createCanvas(grid_size * w + 1, grid_size * w + 1);
    cols = floor(width / w);
    rows = floor(height / w);

    playerNN = new Player();
    myPlayer = new Player();
    boardNN = new Board();
    mypoints = 0;
    myName = "Jeppe"
    playerNN.name = "playerNN"
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    myPlayer.myTurn = true;
}

function mousePressed() {
    console.log(turn);
    if(myPlayer.myTurn){
        myPlayer.think(boardNN, playerNN);
        playerNN.myTurn = true;
        turn = playerNN.name;
        draw();
    }
    else if(playerNN.myTurn){
        playerNN.think(boardNN, myPlayer);
        myPlayer.myTurn = true;
        turn = myPlayer.name;
        draw();
    }
    /* if(myTurn){
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(boardNN.game[i][j].locx==floor(mouseX/w) && boardNN.game[i][j].locy == floor(mouseY/w)){
                    boardNN.game[i][j].press(myName);
                    boardNN.game[i][j].win(myName);
                }
            }
        }
        playerNN.myTurn = true;
        draw();
    } */
   // playerNN.think(boardNN.game); 
}

function gameOver(turn){
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(boardNN.game[i][j].class==playerNN.name){
                playerNN.points += points_symb;
            }
            if(boardNN.game[i][j].class==myPlayer.name){
                myPlayer.points += points_symb;
            }
            if(boardNN.game[i][j].class == myName){
                mypoints += points_symb;
            }
            boardNN.game[i][j].used = false;
            boardNN.game[i][j].class = null;
        }
    }
    console.log("Player " + turn + " wins!!!");
    
    if(turn == "playerNN"){
        playerNN.points += 100;
        myPlayer.myTurn = false;
        playerNN.myTurn = true;
    }
    else if (turn == "myPlayer"){
        myPlayer.points += 100;
        myPlayer.myTurn = true;
        playerNN.myTurn = false;
    }
    else {
        myPlayer.myTurn = true;
        playerNN.myTurn = false;
        console.log("DOOOOOOOOOOOOOOOOOOM")
    }
    draw();
}

function draw(){
    let player
    background(255);
    player = myPlayer;
    player1 = playerNN;
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            boardNN.game[i][j].show(player,player1);
        }
    }
    document.getElementById("turn_screen").innerHTML = turn
    document.getElementById("player1").innerHTML = "MyPlayer "+myPlayer.points;
    document.getElementById("player2").innerHTML = "PlayerNN "+playerNN.points;
}

