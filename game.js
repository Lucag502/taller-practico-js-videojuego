const btnUp= document.querySelector('#up');
const btnDown= document.querySelector('#down');
const btnLeft= document.querySelector('#left');
const btnRoght= document.querySelector('#right');
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if(window.innerHeight> window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    } else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', window.innerWidth *0.75);
    canvas.setAttribute('height', window.innerHeight *0.5);

    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({canvasSize, elementSize});

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps [0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map( row => row.trim().split(``));
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
            console.log({col, colI, row, rowI});
            game.fillText(emoji, posX , posY);
        });
    })

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col) {
    //         game.fillText(emojis[mapRowCols[row - 1] [col -1]],
    //             elementSize * col, elementSize * row);
    //     }
    // }
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
};
function moveDown() {
};
function moveLeft() {
};
function moveRight() {
};