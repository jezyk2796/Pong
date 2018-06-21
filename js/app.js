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

let ballSpeedX = -3;
let ballSpeedY = -1;

function player() {
    //left player paddle
    ctx.fillStyle = '#fc2828';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function computer() {
    //right player paddle
    ctx.fillStyle = '#000000';
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

    //ball and paddle collision
    if(ballX < playerX + paddleWidth && ballY + ballSize > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballX > computerX - paddleWidth && ballY + ballSize > computerY && ballY < computerY + paddleHeight) {
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

const move = {
    player: 'stop',
    computer: 'stop',
}

function paddlesMove() {
    if(move.player === 'up' && playerY > 0) {
        playerY -= 10;
    } else if (move.player === 'down' && playerY < 400) {
        playerY += 10;
    }

    if(move.computer === 'up' && computerY > 0) {
        computerY -= 10;
    } else if (move.computer === 'down' && computerY < 400) {
        computerY += 10;
    }
}

function keyDown(key) {
    if (key.keyCode == '87') {
        move.player = 'up';
        return;
    }
    if (key.keyCode == '83') {
        move.player = 'down';
        return;
    }
    if(key.keyCode == '38') {
        move.computer = 'up';
        return;
    }
    if(key.keyCode == '40') {
        move.computer = 'down';
        return;
    }
}

function keyUp(key) {
    if (key.keyCode == '87') {
        move.player = 'stop';
        return;
    }
    if (key.keyCode == '83') {
        move.player = 'stop';
        return;
    }
    if(key.keyCode == '38') {
        move.computer = 'stop';
        return;
    }
    if(key.keyCode == '40') {
        move.computer = 'stop';
        return;
    }
}

function game() {
    paddlesMove();
    court();
    ball();
    player();
    computer();
}


setInterval(game, 1000 / 60);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);