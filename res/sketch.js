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

let points_symb = 1;
const grid_size = 15;
let fitMax= 0;

let colony_size = 25;
let playRounds = 50;
const winline = 4;
const doom = 10;
const target = 100;

let kierros= 0;


//let boardNN.game_size= "<?php echo $_POST['boardNN.game_size']?>";
//let winline = "<?php echo $_POST['winline']?>";

function setup(){
    noLoop();
    createCanvas(grid_size * w + 1, grid_size * w + 1);
    cols = floor(width / w);
    rows = floor(height / w);
    
    colonize();
    winboard = boards[0];
    winner = colony1[0];
    winner1 = colony2[0];
    draw();
    colony1.forEach(player => {
        player.myTurn = true;
    });
    play();
}

function colonize(){
    playerNN = new Player2();
    myPlayer = new Player1();
    boardNN = new Board();
    playerNN.name = "playerNN"
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    myPlayer.myTurn = true;
    colony2[0]=playerNN;
    colony1[0]=myPlayer;
    boards[0]=boardNN;

    for(let i = 1; i < colony_size; i++){
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
    for(let i = 0; i < playRounds;i++){
        for(let j = 1; j < colony_size; j++){
            if(colony2[j].myTurn){
                colony2[j].think(boards[j], colony1[j])
            }
            else if(colony1[j].myTurn){
                colony1[j].think(boards[j], colony2[j]);
            }
        } 
        kierros += 1;
        //console.log(kierros);
    }
    kierros = 0;
}

function starta(){
    for(let i = 1; i < colony_size; i++){
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
        colony1[i].myTurn = true;
    }
        colony1 = nextGeneration(colony1);
        colony2 = nextGeneration(colony2);
        colony1.forEach(player => {
            player.myTurn = true;
        });
        play();
}

function mousePressed() {
    if(colony1[0].myTurn){
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(boards[0].game[i][j].locx == Math.floor(mouseX/w) && boards[0].game[i][j].locy == Math.floor(mouseY/w)){
                    colony2[0].myTurn = true;
                    boards[0].game[i][j].press(colony1[0]);
                    boards[0].game[i][j].win(colony1[0],colony2[0],boards[0]);  
                }
            }
        }
        colony2[0].think(boards[0], colony1[0]);
    }
}

function gameOver(board,player,player1){
    //console.log(player);
    winboard = boards[0].copy();
    winner = myPlayer;
    winner1 = playerNN;
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(board.game[i][j].class==player.name){
                player.points += points_symb;
            }
            if(board.game[i][j].class == player1.name){
                 player1.points += points_symb;
             }
        }
    }
    player.myTurn = false;
    player.points += player.wins * 250;
    if(player.win==0){player.points -=50}

    player1.myTurn = false;
    player1.points += player1.wins * 250;
    if(player1.win==0){player1.points -=50}

    if(player.win){
        player.points += 100;
        player.wins += 1;
        console.log("Player " + player.name + " wins at "+ boards.indexOf(board));
        player.win = 0;
        if(player.name == "myPlayer" || player.name == "playerNN"){
            boardNN = new Board;
            boards[0] = boardNN;
            starta();
        }
    }
    else {
        console.log("STALLED GAME at board " + boards.indexOf(board))
        let tmp = board.name;
        board = new Board;
        board.name = tmp;
    }
}

function draw(){
    background(255);
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            winboard.game[i][j].show(myPlayer,playerNN);
        }
    };
    
    document.getElementById("player1").innerHTML = winner.name+" "+ winner.points;
    document.getElementById("player2").innerHTML = winner1.name+" "+ winner1.points;
    document.getElementById("gene").innerHTML = "Generaatio :"+ colony1[1].generation;
    document.getElementById("colony").innerHTML = "Colony size: :"+ colony1.length;
    //document.getElementById("muuta").innerHTML = 
}

