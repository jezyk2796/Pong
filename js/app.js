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

let playerY = 100;
let computerY = 100;

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

function game() {
    court();
    ball();
    player();
    computer();
}


setInterval(game, 1000 / 60);