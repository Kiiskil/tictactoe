## tictactoe
#P5-lib training
NeuralNetwork -training

Iiro Laukkanen, 2019

Normal Tic-Tac-Toe, but there is an opponent which is controlled by NN.
Idea is to check how training of NN happens.

There currently is a population of players, divided in two arrays. Player are named : a name plus their board's numebr.
Each player makes one turn on one of set numbers of playrounds; currently 50.
There are two key players, number one (array[0]) of one of two arrays. If one of these players win, a new population is generated. User can play as "myPlayer" against "playerNN"; the key players. PlayerNN is NN-controlled as is every other player besides "myPlayer".

Generation of generations can be automated, as an NN can take over "myPlayer" for number of turns determined by user. Game resumes automatically to clean board after that. 
Each won game can be observed at any time, as they too are stored in array as games are finished. User just have to give indexnumber for that array and press a button. Button labeled "My board" cleans the board for user to play.

Each finished game is evaluated and players are scored based on this evaluation. The higher the score, the higher the chances to get to be brain-donator for next generation, possibly multiple times. There can be hundreds of games in one generation. The gameboards are evaluated based on how many marks on board, how many of those are within set reach of others, both my and enemys marks and how many wins player has. Both won and stalled games are currently taken into calculation when generating new populations. Fitness of player, which ultimately determines the chance of being a donor, is calculated by dividing players points by array's accumulated points of all players.

#Next Id'd like to have the logscreens update as calculations are ongoing
#Next I want to add a training-mode, where NN can iterate over set amount of generations or some other goal.
    #Automate either myPlayer or mouseclick. OF course it's myPlayer, but I have to figure out how to stop the iterations OR how to start, if stop is automated. !!DONE!!
#There is still bugs on incentive, the NN doesnt know what it wants to do.
    #Training data seems to be fine, though not complete.
    #Hidden layer count? Test.
    #Fitness or pointcalculation wrong? Test: check logs.
#Also visually this project is very crude still.
    #Some styling added, there are few controls and a second HTML-logscreen has been added.
#Inputs for generetion size, amount of adjacent marks to win, etc
#Statistics?
    #Kinda, clean console.log. But have to get saving the data on the way.
#Generate training data for most basic scenarios
    #started. TrainingDataGeneration is incomplete but usable.

I am still fiddling with this, but I guess really the next thing is to add a better NN and doublecheck the fitness/point calculations. And maybe try to generate new population not based on fitness but some kind of best player-tournament. OR I could make new population each time a player stalls the game, kind of forcing the population to git gud, so to speak. Still, though this has been great project, I think at least this NN-software doesn't cut it anymore.

Might try another software for NN. Or I might do battle royale-style of generation building.

I went for the elimination of stallers.