class Board {
    constructor(board){
        if(!board){
            this.game = this.make2DArray(cols, rows);
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    this.game[i][j] = new Tile(i * w, j * w, w);
                }
            }
        //console.log(this.game)
        this.name;
        this.doom = doom;
        }
        else{
            this.name = board.name;
            this.game = board.game;
            this.doom = board.doom;
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
}