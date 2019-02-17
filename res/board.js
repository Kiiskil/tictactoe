class Board {
    constructor(){
        this.game = this.make2DArray(cols, rows);
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                this.game[i][j] = new Tile(i * w, j * w, w);
            }
        }
        //console.log(this.game)
        this.name;
    }
    make2DArray(cols, rows){
        let arr = new Array(cols);
        for(let i=0; i < arr.length; i++){
            arr[i] = new Array(rows);
        }
        return arr;
    }
}