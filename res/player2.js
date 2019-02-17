class Player2 {
    constructor () {
        //NeuralNetwork(inputs,hidden layers, outputs)
        //NeuralNetwork(array of numbers, preferable normalized between zero and one, 3 hidden layers(?) and x,y value as output)
        this.points = 0;
        this.brain = new NeuralNetwork(grid_size*grid_size,5,2);
        this.myTurn = false;
        this.name = "Liisa";
        
        this.winner=0;
        this.next = 0;
    }
    
    think(gridi, enemy){
        //console.log(this.name);
        let inputs = this.gridizise(gridi.game, enemy);
        console.log(inputs);
        let outputs = this.brain.predict(inputs);
        let coo_x = floor(map( outputs[0], 0 , 1 , 0 , grid_size));
        let coo_y = floor(map( outputs[1], 0 , 1 , 0 , grid_size));
        console.log("Player kaksi painaa: " +coo_x,coo_y);
        console.log(outputs)
        this.nnMouse(gridi,coo_x,coo_y,enemy);
    }
    
    gridizise(arr, enemy){
        //console.log(arr);
        let arr_new = new Array(grid_size*grid_size);
        let ind_new = 0;
        for(let i=0; i < cols; i++){
            for(let j=0; j < rows; j++){
                if(arr[i][j].class == null){
                    arr_new[ind_new] = 0.1;
                }
                else if(arr[i][j].class == enemy.name){
                    arr_new[ind_new] = 0.5;
                }
                else if(arr[i][j].class == this.name){
                    arr_new[ind_new] = 1;
                }
                ind_new++;
            }
        }
        //console.log(ind_new);
        return arr_new;
    }
    //Function, that makes essentially the same as mousePressed, but for NeuralNetwork, as it returns x,y-values as outputs
    nnMouse(gridi,x,y,enemy){
        if(this.myTurn){
            console.log(gridi);
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    if(gridi.game[i][j].locx == x && gridi.game[i][j].locy == y){
                        gridi.game[i][j].press(this);
                        gridi.game[i][j].win(this,enemy,gridi);
                        console.log(this.name + " Pressed " + gridi.game[i][j].locx,gridi.game[i][j].locy);
                    }
                }
            }
            this.myTurn = false;
            draw();
        }
    }
}