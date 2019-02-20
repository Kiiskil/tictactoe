class Player1 {
    constructor (brain, gener) {
        //NeuralNetwork(inputs,hidden layers, outputs)
        //NeuralNetwork(array of numbers, preferable normalized between zero and one, 3 hidden layers(?) and x,y value as output)
        this.points = 0;
        this.fitness = 0;
        /* if(brain){
            this.brain = brain.copy();
            this.generation;
        }else{
            this.brain = new NeuralNetwork(grid_size*grid_size,5,2);
            this.generation=0;
        } */
        this.myTurn = false;
        this.name = "Teppo";
        this.wins = 0;
        this.win = 0;
        this.winrow = 0;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
            this.generation = gener;
          } else {
            this.brain = new NeuralNetwork(grid_size*grid_size,225,2);
            this.generation = 0;
          }
    }
    
    copy(gener) {
        return new Player1(this.brain, gener);
    }

    train(){
        //let trainingData = generateTrainingData();
        //console.log("Training");
        for (let i= 0; i<trainingData.length/2;i++){
            this.brain.train(trainingData[i*2],trainingData[1+i*2]);
        }
    }

    think(gridi, enemy){
        let inputs = this.gridisize(gridi.game, enemy);
        //console.log(inputs);
        let outputs = this.brain.predict(inputs);
        let coo_x = floor(map( outputs[0], 0 , 1 , 0 , grid_size));
        let coo_y = floor(map( outputs[1], 0 , 1 , 0 , grid_size));
        //console.log(coo_x,coo_y);
        //console.log(outputs)
        //console.log("Player yksi painaa: " +coo_x,coo_y);
        this.nnMouse(gridi,coo_x,coo_y,enemy);
    }

    gridisize(arr, enemy){
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
        return arr_new;
    }
    
    //Function, that makes essentially the same as mousePressed, but for NeuralNetwork, as it returns x,y-values as outputs
    nnMouse(gridi,x,y,enemy){
        if(this.myTurn){
            for(let i=0; i < cols; i++){
                for(let j=0; j < rows; j++){
                    if(gridi.game[i][j].locx == x && gridi.game[i][j].locy == y){
                        //console.log(this.name);
                        gridi.game[i][j].press(this,gridi);
                        gridi.game[i][j].win(this,enemy,gridi);
                        //console.log(this.name + " Pressed " + gridi.game[i][j].locx,gridi.game[i][j].locy);
                    }
                }
            }
            this.myTurn = false;
            enemy.myTurn = true;
        }
    }
}