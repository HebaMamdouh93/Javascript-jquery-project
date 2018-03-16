# Javascript-jquery-project
The game board starts at (iteration 0) with an initial state, at which, only few tiles (squares) are active. Then, when the player starts the game, the game moves from its current iteration to the next iteration according to the following rules.
The rules which control the transition between the iteration are:
1- Any active tile with less than 2 active neighbors will become inactive in the next iteration
2- Any active tile with exactly 2 or 3 active neighbors will stay active in the next iteration
3- Any active tile with more than 3 active neighbors will become inactive in the next iteration
4- Any inactive tile with exactly 3 active neighbors will become active in the next iteration

Game Mechanics:
At start, the player is able to set the initial states of t6he tiles for the first iteration (iteration 0). The user can do so by clicking a tile to toggle its state. Note that this can only be done at iteration 0 (i.e. at the start of the game or after game reset)
Then when the player clicks start, the game should start running, it should automatically compute the states of the tiles for the next iteration (iteration 1) and then draw them in the grid. Then after a delay (configurable), it should compute the states of the tiles for the next iteration (iteration 2) and display them in the grid and so on. And it should continue rendering iterations indefinitely.
The player should be able to reset, start, resume, show previous states and configure the game using the available controls. 

Game Components
1- The Tiles Board
The tiles board is a grid of (n*n) tiles (squares). Each tile can be either active or inactive. If a tile is active, it should be highlighted (i.e. its background color should be changed). And if it’s inactive, it should be dimmed (i.e. its background color should be grey)

2- The Game Controls
a. Start button
At iteration 0 (i.e. game start), when the user clicks it should start the iterations, which means that it will automatically compute the states of the tiles for the next iterations and display them. The delay between iterations is configurable from the delay drop down list.
When the user clicks start, the text on the button should change to “pause” and when the user clicks it, it should pause the iterations.
If the user clicks start again, it should resume the iterations from the last iteration it has reached and count.

b. Next Button
This button can only be clicked when the game is paused or not yet started. If the user clicks it, it should display the next iteration ONLY and should NOT automatically draw the other iterations

c. Previous Button
This button can only be clicked when the game is not running (e.g. pasued) If the user clicks it, it should display the previous iteration only. If there is no previous iteration (i.e. the game is currently at iteration 0), then the button cannot be clicked.
d. Reset Button
The reset button can be clicked to reset the game state to iteration 0, it should stop all the running timers and should reset all the tiles to be inactive. 	

e. Delay Dropdown List
The user can configure the delay between iterations using the delay drop down list. It should contain the following options (100ms/200ms/500ms/1000ms). When the user changes the value at any time, it should change the delay.

f. Grid Size
A drop down list that enables the player to configure the number of the tiles (squares) in the grid. The available options are (20*20 ,50*50 and 100*100 tiles)






