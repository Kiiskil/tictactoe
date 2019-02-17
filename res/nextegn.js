function nextGeneration(colony){
    let colony1x = [];
    calculateFitness(colony);
    for(let i = 0; i < colony_size; i++){
        colony1x[i] = pickOne(colony);
        boards[i] = new Board();
    }
    return colony1x;
}
function pickOne(colony){
   let index = 0;
   let r = random(1);

   while ( r > 0){
       r = r - colony[index].fitness;
       index++;
   }
   index--;
   let player = colony[index];
    if(player.name=="Teppo"){
        child = new Player1(player.brain);
        child.mutate();
    }
    else{
        child = new Player2(player.brain);
        child.mutate();
    }
    return child;
}
function calculateFitness(colony){
    let sum = 0;
    colony.forEach(player => {
        sum += player.points;
    });
    colony.forEach(player => {
        player.fitness += player.points/sum;
    });
}
