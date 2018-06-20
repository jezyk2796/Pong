const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 20;
let ballX = cw /2 - ballSize /2;
let ballY = ch /2 - ballSize /2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const computerX = 910;

let playerY = 200;
let computerY = 200;

const netWidth = 6;
const netHeight = 16;

let ballSpeedX = 5;
let ballSpeedY = 5;

function player() {
    //player paddle
    ctx.fillStyle = '#fc2828';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function computer() {
    //computer paddle
    ctx.fillStyle = '#000000'
    ctx.fillRect(computerX, computerY, paddleWidth, paddleHeight);
}

function ball() {
    //ball
    ctx.fillStyle = '#f1fc28';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    //ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX <= 0 || ballX + ballSize >= cw){
        ballSpeedX = -ballSpeedX;
    }
}

function court() {
    //court
    ctx.fillStyle = '#276003';
    ctx.fillRect(0, 0, cw, ch);

    //net
    for(let netPosition = 20; netPosition < ch; netPosition += 30) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cw /2 - netWidth /2, netPosition, netWidth, netHeight);
    }
}



function multi(key) {
    if (key.keyCode == '87') {
        playerY -= 20;
    }
    if (key.keyCode == '83') {
        playerY += 20;
    }
    if(key.keyCode == '38') {
        computerY -= 20;
    }
    if(key.keyCode == '40') {
        computerY += 20;
    }
}

// function single(key) {
//     if (key.keyCode == '38') {
//         playerY -= 15;
//     }
//     if (key.keyCode == '40') {
//         playerY += 15;
//     }
// }

function game() {
    court();
    ball();
    player();
    computer();
}


setInterval(game, 1000 / 60);

window.addEventListener('keydown', multi);

// window.addEventListener('keydown', single);