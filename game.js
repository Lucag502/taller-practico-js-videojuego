const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time'); 
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const reset_window = document.querySelector('.reset_window')
const reset_confirm = document.querySelector('#reset_confirm');
const actualLevel = document.querySelector('#actualLevel');
const gameOver_window = document.querySelector('.gameOver_window');
const gameOver_confirm = document.querySelector('#gameOver_confirm');


let canvasSize;
let elementSize;
let level = 0;
let lives = 3;


let timeStart;
let timePlayer;
let timeInterval;


const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemiesPositions = [];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if(window.innerHeight >= window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    } else if (window.innerWidth >= window.innerHeight){
        canvasSize = window.innerHeight * 0.7;
    }

    canvasSize = Number(canvasSize = canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10.9;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    reset_window.classList.add('inactive');
    gameOver_window.classList.add('inactive');
    actualLevel.innerHTML = level+1;

    console.log({canvasSize, elementSize});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps [level];

    if (!map) {
        gameWin();
        return;
    };

    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }
    
    showLives();
    showRecord();

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map( row => row.trim().split(``));
    console.log({map, mapRows, mapRowCols});

    enemiesPositions = [];
    game.clearRect(0, 0, canvas.width, canvas.height);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1.5);
            const posY = elementSize * (rowI + 1.2);

            if (col == 'O') {
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X'){
                enemiesPositions.push({
                   x: posX,
                   y: posY, 
                });
            }

            game.fillText(emoji, posX , posY);
        });
    });
    movePlayer();
    
}
function showTime() {
    // actualMoment = Date.now() - timeStart;
    // const minutes = actualMoment.getMinutes();
    // const seconds = actualMoment.getSeconds();
    // const totalTime = minutes + ":" + seconds;
    // document.spanTime = totalTime;
    // setTimeout(showTime,1000);
    spanTime.innerHTML = Date.now() - timeStart;

}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('recordTime');
}

function showLives(){
    const livesArray = Array(lives).fill(emojis['HEARTH']);
    spanLives.innerHTML = "";
    livesArray.forEach(hearth => spanLives.append(hearth));
}

function movePlayer(){
    const giftColissionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftColissionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftColission = giftColissionX && giftColissionY;

    if (giftColission){
        levelWin(); 
    }
    
    const enemyColision = enemiesPositions.find(enemy =>{
        const enemyColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3); 

        return enemyColisionX && enemyColisionY;
        });

        if (enemyColision) { 
            levelFail();
        }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log("subiste de nivel");
    level++;
    startGame();
    
}

function levelFail() {
    lives--;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    if (lives <= 0){
        gameOver();
        timeStart = undefined;
    } else {
        
    startGame();
}
}

function gameWin() {
    reset_window.classList.remove('inactive');
    console.log("Ganaste el juego");
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('recordTime');
    const actualTime = Date.now() - timeStart;

    if(recordTime){
        if(recordTime >= actualTime){
            localStorage.setItem('recordTime', actualTime);
            console.log("Enhorabuena, superaste el record actual!");
        }else{
            console.log("Lo siento, no lograste superar el record :(");
        }
    } else {
        localStorage.setItem('recordTime', actualTime);
        console.log({recordTime, actualTime});
    }

    
    reset_confirm.addEventListener('click', resetGame);
}

function gameOver() {
    gameOver_window.classList.remove('inactive');
    console.log("Juego Terminado");
    level = 0;
    lives = 3;
    gameOver_confirm.addEventListener('click', resetGame);
}

function resetGame() {
    location.reload();
     }

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveByKeys (event) {
    if (event.key == 'ArrowUp') moveUp();    
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowDown') moveDown();
    else if (event.key == 'ArrowRight') moveRight();
    }

function moveUp() {
    if((playerPosition.y - elementSize) < elementSize){
        console.log("out");
    } else {
    playerPosition.y -= elementSize;
    startGame();}  
};
function moveDown() {
    if((playerPosition.y + elementSize) > canvasSize){
        console.log("out");}
        else{
    playerPosition.y += elementSize;    
    startGame();}  
};
function moveLeft() {
    if((playerPosition.x - elementSize) < elementSize){
        console.log("out");}
        else{
    playerPosition.x -= elementSize;
    startGame();}  
};
function moveRight() {
    if((playerPosition.x + elementSize) > canvasSize){
        console.log("out");}
        else{
    playerPosition.x += elementSize;
    startGame();}  
};