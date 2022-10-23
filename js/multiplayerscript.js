const details = localStorage.getItem("details");
const tiles = document.querySelectorAll(".tiles");
const currentTurn = document.querySelector(".current");
const xBox = document.querySelector(".player-x");
const oBox = document.querySelector(".player-o");
const endGameMessage = document.querySelector(".winner-message");
const restartMessage = document.querySelector(".restart-message");
const restartButton = document.querySelector(".restart");
const nextRoundButton = document.querySelector(".next");
const resetButton = document.querySelector(".reset");
const cancelButton = document.querySelector(".cancel");
// For game details 
var playerXScore = 0;
var playerOScore = 0;
var ties = 0;
var counter = 0;
var winner = "";
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

/* Start The Game 
roles - to get and set all details
startGame - main function to star game */
roles(details);
startGame()


// Event listener for restar button
restartButton.addEventListener('click', function(){
    restartMessage.style.display="none";
    refreshScores();
    playerXScore = 0;
    startGame();
})

// Event listener for cancel button
cancelButton.addEventListener('click', function(){
    restartMessage.style.display="none";
})

// Event listener reset button
resetButton.addEventListener('click', function(){
    restartMessage.style.display="flex";
})

// Event listener next round button
nextRoundButton.addEventListener('click', startGame);

function startGame(){
    currentTurn.src = "../assets/icon-x.svg";
    counter = 0;
    for(var tile of tiles){
        if(tile.innerHTML !== ""){
            tile.innerHTML = ""
        }
        tile.addEventListener('click', drawMark);
        endGameMessage.style.display = "none"
    }
}

function roles(player1){
    if(player1 == "x"){
        xBox.innerText ="(P1)"
        oBox.innerText ="(P2)"
    }
    else{
        oBox.innerText ="(P1)"
        xBox.innerText ="(P2)"
    }
}

function drawMark(){
    if(this.innerHTML == ""){
        counter++;
        currentTurnIndicator();
        if(counter % 2 == 1){
            this.innerHTML += 
            `
                <img src="../assets/icon-x.svg">
            `
        }
        else{
            this.innerHTML += 
            `
                <img src="../assets/icon-o.svg">
            `
        }
        checkWin(this.id)
    } 
}

function currentTurnIndicator(){
    if(counter % 2 == 1){
        currentTurn.src = "../assets/icon-o.svg";
    }
    else{
        currentTurn.src = "../assets/icon-x.svg";
    }
}

function checkWin(index){
    for(var x of combinations){
        if(index == x[0]||index == x[1]|| index ==x[2]){
            if(tiles[x[0]].innerHTML == tiles[x[1]].innerHTML && tiles[x[1]].innerHTML == tiles[x[2]].innerHTML){
                countScore()
                endGame();
            }
            else if(tiles[x[0]].innerHTML !== tiles[x[1]].innerHTML && tiles[x[1]].innerHTML !== tiles[x[2]].innerHTML && counter == 9){
                ties+= 1;
                endGame("ties");
                transitionScores(playerXScore, playerOScore, ties);
            }
        }
    }
}

function countScore(){
    if(counter % 2 == 1){
        playerXScore++;
        winner = "x";
    }
    else if(counter % 2 == 0){
        playerOScore++;
        winner = "o";
    }
    transitionScores(playerXScore, playerOScore, ties);
}

function transitionScores(pl1, pl2, tie){
    document.querySelector(".score-x").innerHTML = pl1;
    document.querySelector(".score-o").innerHTML = pl2;
    document.querySelector(".ties-count").innerHTML = tie;
}

function refreshScores(){
    playerOScore = 0;
    playerXScore = 0;
    ties = 0;
    transitionScores(0,0,0);
}

function endGame(ties){
    const winnerText = document.querySelector(".winner")
    if(ties !== "ties"){
        const icon = document.querySelector(".icon");
        icon.style.display = "inline"
        endGameMessage.style.display = "flex";
        icon.src = `../assets/icon-${winner}.svg`;
        if(winner =="x"){

            if(xBox.innerText === "(P1)"){
                winnerText.innerText = "PLAYER 1 WINS!"
            }
            else
            {
                winnerText.innerText = "PLAYER 2 WINS!"
            }
        }
        else{
            if(oBox.innerText === "(P1)"){
                winnerText.innerText = "PLAYER 1 WINS!"
            }
            else
            {
                winnerText.innerText = "PLAYER 2 WINS!"
            }
        }
    }
    else
    {
        document.querySelector(".winner-message").style.display = "inline";
        const tied = document.querySelector(".tied");
        tied.innerText = "ROUND TIED"
    }
}





