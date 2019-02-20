function generateTrainingData(){
    let trainData = [];
    let trainInputs = [225];
    let trainOutput = [2];
    let trainIndex = 0;
    
    //generate training data for all winline - 1 -situations (aka if enemy is about to win)
    //first vertical lines
    for(let k = 0; k <= grid_size-winline;k++){
        for(let f = 0; f < grid_size;f++){
            trainBoard = new Board();
            for(let i=0; i < 1; i++){
                for(let j=0; j < grid_size; j++){
                    if(j<winline-1)trainBoard.game[f][j+k].used = true;
                }
            }
            trainInputs = trainGridisize(trainBoard.game);
            trainData[trainIndex] = trainInputs;
            trainIndex++;
            trainOutput = [f, winline+k];
            trainData[trainIndex] = trainOutput;
            trainIndex++;
        }
        //trainIndex = 0;
    }
    //console.log(trainData);
    return trainData;
}

function trainGridisize(arr){
    //console.log(arr);
    let arr_new = new Array(grid_size*grid_size);
    let ind_new = 0;
    for(let i=0; i < cols; i++){
        for(let j=0; j < rows; j++){
            if(arr[i][j].used){
                arr_new[ind_new] = 0.5;
            }
            else if(arr[i][j].class == null)
            {
                arr_new[ind_new] = 0.1;
            }
            ind_new++;
        }
    }
    return arr_new;
}

