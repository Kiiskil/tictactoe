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
            this.brain = new NeuralNetwork(grid_size*grid_size,200,2);
            this.generation = 0;
          }
    }
    
    copy(gener) {
        return new Player1(this.brain, gener);
    }

    train(){
        let trainingdata = generateTrainingData();
        for (let i= 0; i<trainingdata.length/2;i++){
            this.brain.train(trainingdata[0+i],trainingdata[1+i]);
        }
    }

    think(gridi, enemy){
        let inputs = gridisize(gridi.game, enemy);
        //console.log(inputs);
        let outputs = this.brain.predict(inputs);
        let coo_x = floor(map( outputs[0], 0 , 1 , 0 , grid_size));
        let coo_y = floor(map( outputs[1], 0 , 1 , 0 , grid_size));
        //console.log(coo_x,coo_y);
        //console.log(outputs)
        //console.log("Player yksi painaa: " +coo_x,coo_y);
        this.nnMouse(gridi,coo_x,coo_y,enemy);
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