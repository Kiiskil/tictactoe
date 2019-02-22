## tictactoe
#P5-lib training
NeuralNetwork -training

Iiro Laukkanen, 2019

Normal Tic-Tac-Toe, but there is an opponent which is controlled by NN.
Idea is to check how training of NN happens.

Some tyling added, there are few controls and a second HTML-logscreen has been added.

#Next I want to add a training-mode, where NN can iterate over set amount of generations or some other goal.
    #Automate either myPlayer or mouseclick. OF course it's myPlayer, but I have to figure out how to stop the iterations OR how to start, if stop is automated. !!DONE!!
#There is still bugs on incentive, the NN doesnt know what it wants to do.
    #Training data seems to be fine, though not complete. The WGratio do get better.
    #Hidden layer count? Test.
    #Fitness or pointcalculation wrong? Test: check logs.
#Also visually this project is very crude still.
#Inputs for generetion size, amount of adjacent marks to win, etc
#Statistics?
    #Kinda, clean console.log. But have to get saving the data on the way.
#Generate training data for most basic scenarios
    #started. TrainingDataGeneration is incomplete but usable.
