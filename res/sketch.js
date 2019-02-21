//TIC-TAC-TOE
//Basic Tic-Tac-Toe
//Made with PHP, JS (P5 -library) and Toy-Neural-Network by Coding Train 
//PHP for getting boardNN.game size and amount required for the win from the user.
//Toy-Neural-Network by Coding Train https://github.com/CodingTrain/Toy-Neural-Network-JS

//every player is in array. There are 3 arrays, one for opposing players and one for board. Each player plays against its opposing player

//TODO
//check mutation / incentive / points - calculations
//Do iterative training-mode which works without user
//Now user uses colony1[0] -places player, named myPlayer. It is against colony2[0] - player named playerNN on a boards[0] - board.
//New generation comes along only when game is won on boards[0].

(function (logger) {
    console.old = console.log;
    console.log = function () {
        var output = "", arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            output += "<span class=\"log-" + (typeof arg) + "\">";

            if (
                typeof arg === "object" &&
                typeof JSON === "object" &&
                typeof JSON.stringify === "function"
            ) {
                output += JSON.stringify(arg);   
            } else {
                output += arg;   
            }

            output += "</span>&nbsp;";
        }

        logger.innerHTML += output + "<br>";
        console.old.apply(undefined, arguments);
    };
})(document.getElementById("logger"))


let cols;
let rows;
let w = 30;

let winner;
let winner1;
let winboard;
let bId = 0;
let genPer = [];
let kierrosRajoitin = 0;

let stalledGames = 0;
let wonGames = 0; 
let WGratio = 0;
let results =[];

let colony1 = [];
let colony2 = [];
let boards = [];
let winboards = [];

let points_symb = 1;
const grid_size = 15;
const doom = 5;
const target = 100;
let fitMax= 0;
let automateToggle = false;

let colony_size = 50;////
let playRounds = 50;////
const winline = 5;////

let trainingData = [];
let kierros= 0;


//let boardNN.game_size= "<?php echo $_POST['boardNN.game_size']?>";
//let winline = "<?php echo $_POST['winline']?>";

function setup(){
    noLoop();
    let canvas = createCanvas(grid_size * w + 1, grid_size * w + 1);
    canvas.parent("canvasHolder");
    cols = floor(width / w);
    rows = floor(height / w);
    
    colonize();
    trainingData = generateTrainingData();
    winboard = boards[0];
    winner = colony1[0];
    winner1 = colony2[0];
    draw();
    colony1.forEach(player => {
        player.myTurn = true;
    });
    play();
}

//Make players and boards
function colonize(){
    playerNN = new Player2();
    myPlayer = new Player1();
    playerNN.train();
    boardNN = new Board();
    playerNN.name = "playerNN"
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    myPlayer.myTurn = true;
    colony2[0]=playerNN;
    colony1[0]=myPlayer;
    boards[0]=boardNN;
    console.log("Training...");

    for(let i = 1; i < colony_size; i++){
        colony1[i] = new Player1();
        colony1[i].name = "Teppo" + i;
        colony1[i].myTurn = true;
        colony1[i].train();
        colony2[i] = new Player2();
        colony2[i].name = "Liisa" + i;
        colony2[i].train();
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
    }
}

//iterate over rounds
function play(){
    let genPerGen = [];
    console.log("Playing...")
    for(let i = 0; i < playRounds;i++){
        for(let j = 1; j < colony_size; j++){
            if(colony2[j].myTurn){
                colony2[j].think(boards[j], colony1[j])
            }
            else if(colony1[j].myTurn){
                colony1[j].think(boards[j], colony2[j]);
            }
        } 
    }

    //draw();
    genPerGen[0] = "GEN: "+colony1[1].generation.toString()+ ", RATIO: "+WGratio.toString()+", MAX FITN: "+fitMax.toString();
    genPer.push(genPerGen);
    console.log("All games finished. Results below:")
    console.log(genPer);
    console.log(results);
}

//New generation it is called. New boards for everybody else, and initialize turns
function starta(newGen){
    for(let i = 1; i < colony_size; i++){
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
        //colony1[i].myTurn = true;
    }
    if(newGen){
        colony1 = nextGeneration(colony1);
        colony2 = nextGeneration(colony2);
        boards[0] = new Board;
    }
    colony1.forEach(player => {
        player.myTurn = true;
    });
    draw();
}

//users functions
function mousePressed() {
    if(!automateToggle){
        if(kierrosRajoitin == kierros){
            kierrosRajoitin = 0;
        }
        if(colony1[0].myTurn){
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    if(boards[0].game[i][j].locx == Math.floor(mouseX/w) && boards[0].game[i][j].locy == Math.floor(mouseY/w)){
                        colony2[0].myTurn = true;//ÄLÄ NYT ENÄÄ SIIRRÄ TÄTÄ FUNKTIOIDEN ALLE!!!
                        boards[0].game[i][j].press(colony1[0],boards[0]);
                        boards[0].game[i][j].win(colony1[0],colony2[0],boards[0]);
                        
                    }
                }
            }
            colony2[0].think(boards[0],colony1[0]);
            draw();
        }
    }
    else{
       // wipeBoard();
        draw();
    }
}

function autoToggle() {
    if (!automateToggle){
        //console.log("AUTOMAATTIII");
        kierros =  parseInt(document.getElementById("rounds").value);
        if(kierrosRajoitin<kierros){
            automateToggle = true;
            kierrosRajoitin++;
        }
    }
    if(automateToggle){
        starta(1);
        play()
        automateToggle = false;
        if(colony1[0].myTurn){
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    if(boards[0].game[i][j].locx == Math.floor(mouseX/w) && boards[0].game[i][j].locy == Math.floor(mouseY/w)){
                        colony2[0].myTurn = true;//ÄLÄ NYT ENÄÄ SIIRRÄ TÄTÄ FUNKTIOIDEN ALLE!!!
                        boards[0].game[i][j].press(colony1[0],boards[0]);
                        boards[0].game[i][j].win(colony1[0],colony2[0],boards[0]);
                    }
                }
            }
            colony2[0].think(boards[0], colony1[0]);
            autoToggle();
        }
    }
}

//If gameOver is called, function nullifies turns for that board and those players. New boards are generated, and if user (or oppnent) wins, calls for new generation 
function gameOver(board,player,player1){
    let resultsTMP = [];
    let resultsTMP1 = [];
    let resultsTMP2 = [];
    //winboard = board.copy();
    draw();
    winner = colony1[0];
    winner1 = colony2[0];
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
        resultsTMP[0] = "Player " + player.name.toString(); + " wins at "+ boards.indexOf(board).toString();
        player.win = 0;
        wonGames++;
        winboards.push(board);
        if(player.name == "myPlayer" || player.name == "playerNN"){
            player.points += 100;
            starta(1);
            if(!automateToggle){
                play();
                automateToggle = true;
            }
        }
    }
    else {
        resultsTMP1[0] ="STALLED GAME at board " + boards.indexOf(board).toString();
        if(player.name == "myPlayer" || player.name == "playerNN"){
            boardNN = new Board();
            boards[0] = boardNN;
            starta(0);
            if(!automateToggle)play();
        }
        else{
            let tmp = board.name;
            board = new Board();
            board.name = tmp;
            stalledGames++;
        }
    }
    resultsTMP2.push(resultsTMP[0]);
    resultsTMP2.push(resultsTMP1[0]);
    results.push(resultsTMP2.join());
}

function wipeBoard(){
    automateToggle = false;
    boards[0] = new Board();
    winboard = boards[0]
    bId= 0;
    draw();
}

function seeBoard(){
    wipeBoard();
    bId = parseInt(document.getElementById("winBoard").value);
    if(bId>=0 && bId <winboards.length){
        winboard = winboards[bId];
        bId = boards.indexOf(winboard);
        console.log("Checking board "+bId);
        if(bId == -1){
            wipeBoard();
        }
        automateToggle = true;
    }
    else{
        console.log("Either bad language or there is no winning tables")
        bId = 0;
    };
    draw();
}

function draw(){
    background(255);
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            winboard.game[i][j].show(
                colony1[bId],
                colony2[bId]);
        }
    };
    WGratio = wonGames/stalledGames;
    document.getElementById("player1").innerHTML = winner.name+" "+ winner.points;
    document.getElementById("player2").innerHTML = winner1.name+" "+ winner1.points;
    document.getElementById("gene").innerHTML = "Generaatio :"+ colony1[0].generation;
    document.getElementById("colony").innerHTML = "Colony size: :"+ colony1.length;
    document.getElementById("wonStallRatio").innerHTML = "Ratio of number of player won games over stalled games"+ WGratio;
    //document.getElementById("muuta").innerHTML = 
}

