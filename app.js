
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
    gameMsg.classList.add("hide")
    if(!player.inplay){
        player.inplay=true;
        makeTarget();
        player.score=2000;
        player.ready=true;
        player.activeBomb=0;
        player.totalBombs=2;
        player.plane=document.createElement("div");
        player.plane.setAttribute("class","plane");
        gameArea.appendChild(player.plane);
        requestAnimationFrame(playGame);
        player.x=player.plane.offsetLeft;
        player.y=player.plane.offsetTop;
    }
    
}


function makeTarget(){
    player.base=document.createElement("div")
    player.base.setAttribute("class","base")
    player.base.style.width=Math.floor(Math.random()*200)+10+"px";
    player.base.style.height=Math.floor(Math.random()*100)+100+"px";
    player.base.style.left=Math.floor(Math.random()*(gameArea.offsetWidth-200))+100+"px";
    gameArea.appendChild(player.base)
}

function makeBomb(){
    if(player.ready){
        player.score-=300;
        player.activeBomb++;
        let bomb=document.createElement("div");
        bomb.classList.add("bomb");
        bomb.innerHTML=player.activeBomb;
        bomb.y=player.y;
        bomb.x=player.x;
        bomb.style.left=bomb.x+"px";
        bomb.style.top=bomb.y+"px";
        gameArea.appendChild(bomb)
        player.ready=false;
        setTimeout(function(){
            player.ready=true
        },500)
    }
}

function moveBomb(){
    let bombs=document.querySelectorAll(".bomb");
    bombs.forEach(function(item){
        item.y+=5;
        item.style.top=item.y+"px"
        if(item.y>1000){
            player.activeBomb--;
            item.parentElement.removeChild(item)
        }

        if(isCollide(item, player.base)){
            console.log("crash");
        }
    })
}

function isCollide(a,b){
    let aRect=a.getBoundingClientRect()
    let bRect=b.getBoundingClientRect()

    return!(
        aRect.bottom<bRect.top ||
        aRect.top>bRect.bottom ||
        aRect.right>bRect.left ||
        aRect.left>bRect.right
    )
}


function playGame(){
    if(player.inplay){
        moveBomb();
        if(keys.space){
            makeBomb();
        }

        if(keys.ArrowUp&&player.y>65){
            player.y-=player.speed;
        }

        if(keys.ArrowDown && player.y<250){
            player.y+=player.speed;
        }

        if(keys.ArrowRight&& player.x<(gameArea.offsetWidth-60)){
            player.x+=player.speed;
        }

        if(keys.ArrowLeft&&player.x>0){
            player.x-=player.speed;
        }

        player.x+=(player.speed*1.4);
        if(player.x>gameArea.offsetWidth){
            player.x=0;
            player.score-=100;
        }

        player.score--;
        if(player.score<0){
            player.score=0;
        }

        player

        player.plane.style.left=player.x+"px";
        player.plane.style.top=player.y+"px";

        window.requestAnimationFrame(playGame);
        score.innerHTML="Your score is: "+player.score
    }
}

function pressOn(e){
    e.preventDefault();
    let tempKey= (e.key==" ") ? "space" : e.key;
    keys[tempKey]=true;

}



function pressOff(e){
    e.preventDefault();
    let tempKey= (e.key==" ") ? "space" : e.key;
    keys[tempKey]=false;
}