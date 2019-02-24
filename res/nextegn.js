function nextGeneration(colony){
    let colony1x = [];
    calculateFitness(colony);
    for(let i = 0; i < colony_size; i++){
        colony1x[i] = pickOne(colony);
        if (i < colony.length){
            colony1x[i].name = colony[i].name;
        }
        else if(i%2==0){colony1x[i].name = "Teppo"+1}
        else{colony1x[i].name = "Liisa"+1}
    }
    return colony1x;
}

function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }

function pickOne(colony){
   let index = 0;
   let r = random(1);
   let newPlayer;

   //The higher the fitness, the better chances to get picked 
   while ( r > 0){
       r = r - colony[index].fitness;
       index++;
   }
   index--;
   newPlayer = colony[index].copy(colony[index].generation);
   newPlayer.generation += 1;

   return newPlayer;
}

function calculateFitness(colony){
    let sum = 0;
    colony.forEach(player => {
        sum += player.points;
    });
    //console.log(sum);
    colony.forEach(player => {
        player.fitness = player.points/sum;
        if(player.fitness>fitMax){
            fitMax = player.fitness;
        }
    });
   // console.log("MAX FITNESS: "+fitMax);
}

