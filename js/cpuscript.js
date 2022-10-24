var origBoard;
const details = localStorage.getItem("details");
const xBox = document.querySelector(".player-x");
const oBox = document.querySelector(".player-o");
const resetButton = document.querySelector(".reset");
const restartButton = document.querySelector(".restart");
const restartMessage = document.querySelector(".restart-message");
const nextRoundButton = document.querySelector(".next");
const messageArea = document.querySelector(".message");
const cancelButton = document.querySelector(".cancel");





let iconX = '<img src="../assets/icon-x.svg">';
let iconO = '<img src="../assets/icon-o.svg">'
var realPlayer;
var cpuPlayer;
var playerXScore = 0;
var playerOScore = 0;
var ties = 0;
const combinations= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const tiles = document.querySelectorAll(".tiles");

selectMark(details);
startGame();

resetButton.addEventListener('click', function(){
    restartMessage.style.display="flex";
})

restartButton.addEventListener('click', function(){
    restartMessage.style.display="none";
    for(var tile of tiles){
        tile.innerHTML = ""
    }
    selectMark(details);
    playerXScore = 0;
    playerOScore = 0;
    transitionScores();
})

nextRoundButton.addEventListener('click', function(){
    for(var tile of tiles){
        tile.innerHTML = "";
    }
    messageArea.style.display = "none";
    selectMark(details)
});

cancelButton.addEventListener('click', function(){
    restartMessage.style.display="none";
})

function selectMark(player1){
    messageArea.style.display = "none"
    realPlayer = player1 === "x" ? iconX : iconO;
    cpuPlayer = player1 === "o" ? iconX : iconO;
    roles(player1);

    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', turnClick,false);
    }
    if (player1 == "o") {
        turn(bestSpot(),cpuPlayer);
    }
}

function roles(pl1){
    if(pl1 == "x"){
        xBox.innerText ="(YOU)"
        oBox.innerText ="(CPU)"
    }
    else{
        oBox.innerText ="(YOU)"
        xBox.innerText ="(CPU)"
    }
}

function startGame(){
    messageArea.style.display = "none";
    for(var i=0; i < tiles.length; i++){
        
        tiles[i].addEventListener('click', turnClick,false);
    }
}

function turnClick(tile){
    if(typeof origBoard[tile.target.id] == 'number'){
        turn(tile.target.id, realPlayer);
        if(!checkWin(origBoard, realPlayer) && !checkTie())
            turn(bestSpot(), cpuPlayer)
    }  
}

function turn(tileId, player){
    origBoard[tileId] = player;
    document.getElementById(tileId).innerHTML = player
    let gameWon = checkWin(origBoard, player)
    if(gameWon) gameOver(gameWon);
    checkTie();
}

function checkWin(board, player){
    let plays = board.reduce((a, e, i) =>
     (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of combinations.entries()){
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for(let index of combinations[gameWon.index]){
        document.getElementById(index).backgroundColor = 
        gameWon.player == realPlayer ? "blue" : "red";
    }
    for(var i = 0; i < tiles.length; i++){
        tiles[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == realPlayer ? realPlayer : cpuPlayer)
}

function declareWinner(who){
    if(who == realPlayer ? showMessage("winner") : who == cpuPlayer ? showMessage("looser") : showMessage("ties"));
    
    if(who == iconX ? playerXScore++ : who == iconO ? playerOScore++ : ties++);
    transitionScores();
}

function transitionScores(){
    document.querySelector(".score-x").innerHTML = playerXScore;
    document.querySelector(".score-o").innerHTML = playerOScore;
    document.querySelector(".ties-count").innerHTML = ties;
}
function showMessage(condition){
    const textArea= document.querySelector(".text");
    if(condition == "winner"){
        textArea.innerText = "YOU WIN!"
    }
    else if(condition == "looser"){
        messageArea.style.display ="flex";
        textArea.innerText = "YOU LOOSE!"
    }
    else{
        messageArea.style.display ="flex";
        textArea.innerText = "GAME TIED!"
    }
}

function emptySquares(){
    return origBoard.filter((elm, i) => i===elm);
}

function bestSpot(){
    return minimax(origBoard, cpuPlayer).index
}

function checkTie(){
    if(emptySquares().length === 0){
        for(var i = 0; i < tiles.length; i++){
            tiles[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Wins");
        return true
    }
    return false
}

function minimax(newBoard, player){
    var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, realPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, cpuPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == cpuPlayer) {
			var result = minimax(newBoard, realPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, cpuPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

    var bestMove, bestScore;
    if(player === cpuPlayer){
        var bestScore = -10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{
        var bestScore = 10000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}
