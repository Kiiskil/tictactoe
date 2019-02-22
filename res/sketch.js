//TIC-TAC-TOE
//Basic Tic-Tac-Toe
//Made with PHP, JS (P5 -library) and Toy-Neural-Network by Coding Train 
//PHP for getting boardNN.game size and amount required for the win from the user.
//Toy-Neural-Network by Coding Train https://github.com/CodingTrain/Toy-Neural-Network-JS

//every player is in array. There are 3 arrays, one for opposing players and one for board. Each player plays against its opposing player

//TODO
//check mutation / incentive / points - calculations
//Now user uses colony1[0] -places player, named myPlayer. It is against colony2[0] - player named playerNN on a boards[0] - board.
//New generation comes along only when game is won on boards[0].

let genInfo = [];

let stalledGames = 0;
let wonGames = 0; 
let WGratio = 0;
let results =[];

const target = 100;

let automateToggle = false;
let autoRounds= 0;
let autoRoundsRajoitin = 0;

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
    draw();
    colony1.forEach(player => {
        player.myTurn = true;
    });
    play();
}

//users functions
function mousePressed() {
    if(!automateToggle){
        if(autoRoundsRajoitin == autoRounds){
            autoRoundsRajoitin = 0;
            boards[0].copyEmpty();
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
        draw();
        automateToggle = true;
    }
}

//If gameOver is called, function nullifies turns for that board and those players. New boards are generated, and if user (or oppnent) wins, 
//calls for new generation 
//also every player's points are calculated here.
function gameOver(board,player,player1){
    let resultsTMP = [];
    draw();
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
        //if any player wins
        winboards.push(board.copy());
        player.points += 100;
        player.wins += 1;
        results.push(" Player " + player.name.toString() + " wins at board"+ boards.indexOf(board).toString());
        results.push("Stored at: "+(winboards.length-1));
        player.win = 0;
        wonGames++;
        
        if(player.name == "myPlayer" || player.name == "playerNN"){
            player.points += 100;
            //new generation
            starta(1);
            if(!automateToggle){
                play();
                automateToggle = true;
            }
        }
    }
    else {
        //if result of game is draw
        resultsTMP[0] ="STALLED GAME at board " + boards.indexOf(board).toString();
        if(player.name == "myPlayer" || player.name == "playerNN"){
            boardNN = boardNN.copyEmpty();
            //new boards
            starta(0);
            if(!automateToggle){
                play();
            }
        }
        else{
            //all other stalled games are restarted without new generation
            board = board.copyEmpty();
            stalledGames++;
        }
    }
    results.push(resultsTMP.join());
}

function draw(){
    background(255);
    document.getElementById("winCount").innerHTML = "";
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            showBoard.game[i][j].show(showBoard);
           }
    };
    WGratio = wonGames/stalledGames;
    document.getElementById("player1").innerHTML = winner.name+" "+ winner.points;
    document.getElementById("player2").innerHTML = winner1.name+" "+ winner1.points;
    document.getElementById("winCount").innerHTML += "Generaatio: "+ colony1[0].generation+"<br>";
    document.getElementById("winCount").innerHTML += "Colony size: :"+ colony1.length+"<br>";
    document.getElementById("winCount").innerHTML += "Ratio of number of player won games over stalled games:  "+  WGratio.toFixed(2)+"<br>";
    document.getElementById("winCount").innerHTML += "There are currently "+winboards.length+" won boards."+"<br>";
    //document.getElementById("muuta").innerHTML = 
}

