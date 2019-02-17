//TIC-TAC-TOE
//Basic Tic-Tac-Toe
//Made with PHP, JS (P5 -library) and Toy-Neural-Network by Coding Train 
//PHP for getting boardNN.game size and amount required for the win from the user.
//Toy-Neural-Network by Coding Train https://github.com/CodingTrain/Toy-Neural-Network-JS

//GameOver iterates over for some reason, and points grow too fast.

let cols;
let rows;
let w = 30;
let turn = "myPlayer";
let brain;

let winner;
let winner1;
let winboard;

let colony1 = [];
let colony2 = [];
let boards = [];

let points_symb = 0.5;
const grid_size = 15;
let fitMax= 0;
let pointsMax = 0;

let colony_size = 200;
let playRounds = 50;
const winline = 4;
const doom = 10;
const target = 100;


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
    colony1[0]=playerNN;
    colony2[0]=myPlayer;
    boards[0]=boardNN;
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    myPlayer.myTurn = true; */

    colonize();
    winboard = boards[0];
    winner = colony1[0];
    winner1 = colony2[0];
    colony1.forEach(player => {
        player.myTurn = true;
    });
    play();
}

function colonize(){
    for(let i = 0; i < colony_size; i++){
        colony1[i] = new Player1();
        colony1[i].name = "Teppo" + i;
        colony1[i].myTurn = true;
        colony2[i] = new Player2();
        colony2[i].name = "Liisa" + i;
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
    }
}

function play(){
    /* boards.forEach(boardy => {
        boardy.game.used = false;
        boardy.game.class = null;
    }); */
    /* colony1.forEach(player => {
        player.myTurn = true;
    }); */
    for(let i = 0; i < playRounds;i++){
        for(let j = 0; j < colony_size; j++){
            if(colony2[j].myTurn){
                colony2[j].think(boards[j], colony1[j]) 
            }
            else if(colony1[j].myTurn){
                colony1[j].think(boards[j], colony2[j]);
            }
        } 
    }
}

function starta(){
    colony1 = nextGeneration(colony1);
    colony2 = nextGeneration(colony2);
    colony1.forEach(player => {
        player.myTurn = true;
    });
    for(let i = 0; i < colony_size; i++){
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
    }
    play();
}

function mousePressed() {
    if(colony1[0].myTurn){
        //colony1[0].think(boards[0], colony2[0]);
        //colony2[0].myTurn = true;
        //draw();
        play();
    }
    else if(colony2[0].myTurn){
        //colony2[0].think(boards[0], colony1[0]);
        //colony1[0].myTurn = true;
        //draw();
        play();
    }
    else {
        starta();
    }
   /*  colony1 = nextGeneration(colony1);
    colony2 = nextGeneration(colony2); */
    pointsMax = 0;
    //play()
}

function gameOver(turn,board,player,player1){
    winboard = board.copy();
    winner = player;
    winner1 = player1;
    boards.forEach(boardy => {
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(boardy.game[i][j].class==player.name){
                    player.points += points_symb;
                }
                if(boardy.game[i][j].class == player1.name){
                    player1.points += points_symb;
                }
            }
        }
    });
    colony1.forEach(player => {
        player.myTurn = false;
        player.points += player.wins * 250;
    });
    colony2.forEach(player => {
        player.myTurn = false;
        player.points += player.wins * 250;
    });
    if(player.win){
        //draw();
        player.points += 100;
        player.wins += 1;
        winboard = board;
        console.log("Player " + player.name + " wins at "+ colony1.indexOf(player));
        console.log("Player " + player1.name + " loses at "+ colony2.indexOf(player1));
        document.getElementById("muuta").innerHTML = "VoittoLauta :" + boards.indexOf(board);
        draw();
        player.win = 0;
        board = new Board();
        starta();
    }
    else {
        console.log("DOOOOOOOOOOOOOOOOOOM")
        starta();
    }
    turn = 0;
    /* if(pointsMax<target){
        play();
    } */
}

function draw(){
    background(255);

    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            winboard.game[i][j].show(winner,winner1);
        }
    };
    
    document.getElementById("player1").innerHTML = winner.name+" "+ winner.points;
    document.getElementById("player2").innerHTML = winner1.name+" "+ winner1.points;
    document.getElementById("gene").innerHTML = "Generaatio :"+ winner.generation;
    document.getElementById("colony").innerHTML = "Colony size: :"+ colony1.length;
    //document.getElementById("muuta").innerHTML = 
}

