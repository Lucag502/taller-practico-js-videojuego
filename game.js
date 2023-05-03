const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;
let level = 0;


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
        canvasSize = window.innerWidth * 0.4;
    } else if (window.innerWidth >= window.innerHeight){
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width', window.innerWidth *0.33);
    canvas.setAttribute('height', window.innerHeight *0.7);

    elementSize = canvasSize / 10.9;

    startGame();
}

function startGame() {
    console.log({canvasSize, elementSize});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps [level];

    if (!map) {
        gameWin();
        return;
    };

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map( row => row.trim().split(``));
    console.log({map, mapRows, mapRowCols});

    enemiesPositions = [];
    game.clearRect(0, 0, canvas.width, canvas.height);

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1.5);
            const posY = elementSize * (rowI + 1);

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
            console.log("chocaste contra un enemigo");
        }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log("subiste de nivel");
    level++;
    startGame();
}

function gameWin() {
    console.log("Ganaste el juego");
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