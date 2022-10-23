const chooseMark = document.querySelectorAll(".choose-box");
const multiplayerButton = document.querySelector(".btn-player");
const cpuButton = document.querySelector(".btn-cpu");
let player1;


getGameDetails();
multiplayerButton.addEventListener("click", function(){
    if(player1){
        localStorage.clear();
        localStorage.setItem("details", player1);
        window.location.href = "./html/multiplayer.html";
        
    }
    else{
        alert("choose mark")
    }
})
cpuButton.addEventListener("click", function(){
    if(player1){
        localStorage.clear();
        localStorage.setItem("details", player1);
        window.location.href = "./html/cpu.html";
        
    }
    else{
        alert("choose mark")
    }
})


function getGameDetails(){
    for(var mark of chooseMark){
        mark.addEventListener('click', makeBoxActive);
    }
}
function makeBoxActive(){
    if(document.querySelector(".active")){
    const current = document.querySelector(".active")
    current.className = current.className.replace(" active", "");
    this.className += " active";
    }
    else{
        this.className += " active";
    }
    player1 = this.id    
}












