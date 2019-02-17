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

let colony1 = [];
let colony2 = [];
let boards = [];

let colony_size = 10;
let playRounds = 50;

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

    /* playerNN = new Player1();
    myPlayer = new Player2();
    boardNN = new Board();
    mypoints = 0;
    myName = "Jeppe"
    playerNN.name = "playerNN"
    colony1[0].push(playerNN);
    colony2[0].push(myPlayer);
    boards[0].push(boardNN);
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    myPlayer.myTurn = true; */

    colonize();
    play();
}

function colonize(){
    for(let i = 0; i < colony_size; i++){
        colony1[i] = new Player1();
        colony1[i].myTurn = true;
        colony2[i] = new Player2();
        boards[i] = new Board();
    }
}
function play(){
    for(let i = 0; i < playRounds;i++){
        for(let j = 0; j < colony_size; j++){
            if(colony2[j].myTurn){
                colony2[j].think(boards[j], colony1[j]);
                colony1[j].myTurn = true;
                draw();
            }
            else if(colony1[j].myTurn){
                colony1[j].think(boards[j], colony2[j]);
                colony2[j].myTurn = true;
                draw();
            }
        } 
    }
}

function mousePressed() {
    if(colony1[0].myTurn){
        colony1[0].think(boards[0], colony2[0]);
        colony2[0].myTurn = true;
        draw();
    }
    else if(colony2[0].myTurn){
        colony2[0].think(boards[0], colony1[0]);
        colony1[0].myTurn = true;
        draw();
    }
    colony1 = nextGeneration(colony1);
    for(let i = 0; i < colony_size; i++){
        colony1[i].myTurn = true;
    };
    colony2 = nextGeneration(colony2);
    play();
}

function gameOver(turn,board,player,player1){
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(board.game[i][j].class==player.name){
                player.points += points_symb;
            }
            if(board.game[i][j].class == player1.name){
                player1.points += points_symb;
            }
            board.game[i][j].used = false;
            board.game[i][j].class = null;
        }
    }
    if(turn != "nada"){
        player.points += 100;
        console.log("Player " + player.name + " wins!!!");
    }
    else {
        player1.myTurn = true;
        player.myTurn = false;
        console.log("DOOOOOOOOOOOOOOOOOOM")
    }
    draw();
}

function draw(){
    let player
    background(255);

    player = colony1[0];
    player1 = colony2[0];
    
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            boards[0].game[i][j].show(player,player1);
        }
    }
    document.getElementById("turn_screen").innerHTML = "Vuoro :"+player.name;
    document.getElementById("player1").innerHTML = player.name+" "+colony1[0].points;
    document.getElementById("player2").innerHTML = player1.name+" "+colony2[0].points;
}

