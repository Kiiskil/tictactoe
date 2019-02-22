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