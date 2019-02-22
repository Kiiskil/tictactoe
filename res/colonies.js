let colony_size = 10;////

let colony1 = [colony_size];
let colony2 = [colony_size];
let fitMax= 0;

let playRounds = 50;////
const winline = 5;////

function colonize(){
    //Make players and boards
    playerNN = new Player2();
    myPlayer = new Player1();
    playerNN.train();
    boardNN = new Board();
    playerNN.name = "playerNN"
    myPlayer.name = "myPlayer"
    boardNN.name  = "boardNN"
    boardNN.playerUno = myPlayer;
    boardNN.playerDeux = playerNN;
    myPlayer.myTurn = true;
    colony2[0]=playerNN;
    colony1[0]=myPlayer;
    boards[0]=boardNN;
    showBoard = boards[0];
    winner = colony1[0];
    winner1 = colony2[0];
    consoleLog("Training...");

    for(let i = 1; i < colony_size; i++){
        colony1[i] = new Player1();
        colony1[i].name = "Teppo"+i;
        colony1[i].myTurn = true;
        //colony1[i].train();
        colony2[i] = new Player2();
        colony2[i].name = "Liisa"+i;
        //colony2[i].train();
        boards[i] = new Board();
        boards[i].name = "Lauta" + i;
        boards[i].playerUno = colony1[i];
        boards[i].playerDeux = colony2[i];    }
}
//New generation it is called. New boards for everybody else, and initialize turns
function starta(newGen){
    if(newGen){
        colony1 = nextGeneration(colony1);
        colony2 = nextGeneration(colony2);
        boards[0] = boards[0].copyEmpty();
    }
    colony1.forEach(player => {
        player.myTurn = true;
    });
    for(let i = 1; i < colony_size; i++){
        boards[i] = boards[i].copyEmpty();
    }
    consoleLog("Generation "+ colony1[1].generation +" have been born.");
}

//iterate over rounds
function play(){
    let genInfoGen = [];
    consoleLog("Playing...");
        for(let i = 0; i < playRounds;i++){
            for(let j = 1; j < colony_size; j++){
                if(colony2[j].myTurn){
                    colony2[j].think(boards[j], colony1[j])
                }
                else if(colony1[j].myTurn){
                    colony1[j].think(boards[j], colony2[j]);
                }
            } 
        };
    genInfoGen[0] = "GEN: "+colony1[1].generation.toString()+ ", RATIO: "+WGratio.toFixed(2).toString()+", MAX FITN: "+fitMax.toFixed(2).toString();
    genInfo.push(genInfoGen);
    consoleLog("All games finished.");
    consoleLog(genInfo[genInfo.length-1]);
    consolePlayLog(results);
}

function autoToggle() {
    //automate a function similar to mousePressed()
    if (!automateToggle){
        autoRounds =  parseInt(document.getElementById("rounds").value);
        if(autoRoundsRajoitin<autoRounds){
            automateToggle = true;
            autoRoundsRajoitin++;
        }
    }
    if(automateToggle){
        starta(1);
        play()
        automateToggle = false;
        if(colony1[0].myTurn && autoRounds < (autoRoundsRajoitin-1)){
            colony1[0].think(boards[0], colony2[0]);
            colony2[0].think(boards[0], colony1[0]);
            }
        showBoard = boards[0].copy();
        draw();
        autoToggle();
    }
}