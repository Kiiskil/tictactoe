let boards = [];
let winboards = [];
let showBoard;

let cols;
let rows;
const grid_size = 15;

class Board {
    constructor(board){
        if(!board){
            this.game = this.make2DArray(cols, rows);
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    this.game[i][j] = new Tile(i * w, j * w, w);
                }
            }
        this.name;
        this.doom = doom;
        this.playerUno;
        this.playerDeux;
        }
        else{
            this.name = board.name;
            this.game = board.game;
            this.doom = board.doom;
            this.playerUno = board.playerUno;
            this.playerDeux = board.playerDeux;
        }
    }

    make2DArray(cols, rows){
        let arr = new Array(cols);
        for(let i=0; i < arr.length; i++){
            arr[i] = new Array(rows);
        }
        return arr;
    }
    
    copy(){
        return new Board(this);
    }
    copyEmpty(){
        let tmpBoard = new Board(this);
        tmpBoard.game = this.make2DArray(cols,rows);
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                tmpBoard.game[i][j] = new Tile(i * w, j * w, w);
            }
        }
        return tmpBoard;
    }
}

function wipeBoard(){
    automateToggle = false;
    /* boards[0] = new Board();
    boards[0].playerUno = myPlayer;
    boards[0].playerDeux = playerNN; */
    showBoard = boards[0].copy();
    winner = myPlayer;
    winner1 = playerNN;
    draw();
}

function seeBoard(){
    //take user's argument as index of won boards, and show that board
    wipeBoard();
     let bId = parseInt(document.getElementById("winBoard").value);
     bId--;
    if(bId>=0 && bId <winboards.length){
        showBoard = winboards[bId].copy();
        bId++;
        consoleLog("Checking number "+bId +" finished board: "+ showBoard.name);
        automateToggle = true;
    }
    else{
        consoleLog("Either bad language or there is no winning tables");
        wipeBoard();
    };
    winner = showBoard.playerUno;
    winner1 = showBoard.playerDeux;
    draw();
}