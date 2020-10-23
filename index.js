const popUp = document.getElementById('popUp');
const gameArea = document.getElementById('gameArea');
const scoreCard= document.getElementById('scoreCard');
// object to check which key is pressed

const keys= {ArrowUp:false , ArrowDown:false, ArrowRight:false, ArrowLeft:false};
player={speed:5, score:0};

// Start the Game

function startGame(){
 player.start=true;   
popUp.classList.add('hide');
gameArea.innerHTML="";
player.score=0;
    // request animation frame
window.requestAnimationFrame(playGame);

const car= document.createElement('div');
car.setAttribute('class','car');
gameArea.appendChild(car);
player.x=car.offsetLeft;
player.y=car.offsetTop;

// to genearate cars on road
for(let i=0;i<3;i++){
    const enemyCar= document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y=((i+1)*350)*(-1);
    enemyCar.style.top=enemyCar.y+"px";
    gameArea.appendChild(enemyCar);
    enemyCar.style.backgroundColor=randomColor();
    enemyCar.style.left= Math.floor(Math.random() * 350);
    enemyCar.innerText=i;
}
// to generate lines on road
for(let i=0;i<5;i++){
    const line= document.createElement('div');
    line.setAttribute('class','lines');
    line.y=(i*150);
    line.style.top=line.y+"px";
    gameArea.appendChild(line);
}

}

function keyDown(e){
e.preventDefault();
keys[e.key] = true;
}
function keyUp(e){
e.preventDefault();
keys[e.key] = false;
}

// function for generating random colors
function randomColor(){
 function c(){
    let randomHexNumber=Math.floor(Math.random()*256).toString(16);
    return ("0"+randomHexNumber).substr(-2);
 }
    return "#"+c()+c()+c();
}

// Function For animating road lines
function moveRoadLines(){
    const lines= document.querySelectorAll('.lines');
    lines.forEach((line)=>{
        if(line.y>=700){
            line.y-=750;
        }
      line.y+=player.speed;
      line.style.top=line.y;
    })

}

// function to check collision between our car and enemycar
function isCollide(a,b){
    const aRect=a.getBoundingClientRect();
    const bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}



// For animating cars
function moveEnemyCars(car){
    const enemies= document.querySelectorAll('.enemy');
    enemies.forEach((enemyCar)=>{
        if(isCollide(car,enemyCar)){
            gameOver();
        }
        if(enemyCar.y>=700){
            enemyCar.y=-300;
            enemyCar.style.left=Math.floor(Math.random() *350) +"px";
            enemyCar.style.backgroundColor=randomColor();
        }
      enemyCar.y+=player.speed;
      enemyCar.style.top=enemyCar.y+"px";
  
    })

}
//function to start playing the game

function playGame(){
if(player.start){     
  
   const car= document.querySelector('.car');
   let road= gameArea.getBoundingClientRect();
   if(keys.ArrowUp && player.y >70){player.y-=player.speed;}
   if(keys.ArrowDown && player.y < (road.bottom-car.offsetHeight)){player.y+=player.speed;}
   if(keys.ArrowLeft && player.x >0){player.x-=player.speed;}
   if(keys.ArrowRight && player.x < (road.width-(car.offsetWidth+20))){player.x+=player.speed;}
    moveRoadLines();
    moveEnemyCars(car);
    car.style.left=player.x +"px";
    car.style.top=player.y+"px";
    player.score++;
    const ps=player.score-1;
    scoreCard.innerText=`Score: ${ps}`;
      window.requestAnimationFrame(playGame);
      
    }
}
// function for ending the game

function gameOver(){
    player.start=false;   
    popUp.classList.remove('hide');
    popUp.innerHTML=`Game Over <br> Your Final Score is:${player.score} <br> Press Here to restart the game! `
}

// Event Listeners
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
popUp.addEventListener('click',startGame);
