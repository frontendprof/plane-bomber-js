
const gameMsg=document.querySelector(".gameMsg")
const score = document.querySelector(".score")
const gameArea=document.querySelector(".gameArea")




document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
document.addEventListener("click",start);


let player={
    score:0,
    speed:3,
    inplay:false
}


let keys={
    space:false
}

function start(){
    player.inplay=true;
    player.plane=document.createElement("div");
    player.plane.setAttribute("class","plane");
    gameArea.appendChild(player.plane);
    requestAnimationFrame(playGame);
    player.x=player.plane.offsetLeft;
    player.y=player.plane.offsetTop;
}

function playGame(){
    if(player.inplay){
        console.log(keys);

        if(keys.ArrowUp){
            player.y-=player.speed;
        }

        if(keys.ArrowDown){
            player.y+=player.speed;
        }

        if(keys.ArrowRight){
            player.x+=player.speed;
        }

        if(keys.ArrowLeft){
            player.x-=player.speed;
        }

        player.plane.style.left=player.x+"px";
        player.plane.style.top=player.y+"px";

        window.requestAnimationFrame(playGame)
    }
}

function pressOn(e){
    e.preventDefault();
    let tempKey=(e.key=="")?"space":e.key;
    keys[tempKey]=true;

}

function pressOff(e){
    e.preventDefault();
    let tempKey=(e.key=="")?"space":e.key;
    keys[tempKey]=false;
}