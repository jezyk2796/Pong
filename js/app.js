const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const cw = canv.width;
const ch = canv.height;

const ballSize = 20;
let ballX = cw /2 - ballSize /2;
let ballY = ch /2 - ballSize /2;

function ball() {
    //ball
    ctx.fillStyle = '#f1fc28';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function court() {
    //court
    ctx.fillStyle = '#276003';
    ctx.fillRect(0, 0, cw, ch);
}

court();
ball();
