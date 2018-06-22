document.addEventListener('DOMContentLoaded', function() {
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

    let leftPoints = 0;
    let rightPoints = 0;

    const leftWin = 'LEFT PLAYER WINS !!!';
    const rightWin = 'RIGHT PLAYER WINS !!!';

    //sounds
    const left = new Audio();
    left.src = 'sounds/left.wav';

    const right = new Audio();
    right.src = 'sounds/right.wav';

    const wall = new Audio();
    wall.src = 'sounds/wall.mp3';

    const out = new Audio();
    out.src = 'sounds/out.wav';

    const end = new Audio();
    end.src = 'sounds/end.mp3';

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
            wall.play();
        }

        if (ballX >= playerX && ballX <= computerX) {

            //ball and paddle collision

            //left paddle
            if(ballX < playerX + paddleWidth && ballY + ballSize > playerY && ballY < playerY + paddleHeight/2) {
                if(ballSpeedY < 0) {
                    ballSpeedX = -ballSpeedX;
                    speedUp();
                    left.play();
                } else if(ballSpeedY > 0) {
                    ballSpeedX = -ballSpeedX;
                    ballSpeedY = -ballSpeedY;
                    speedUp();
                    left.play();
                }
            } else if(ballX < playerX + paddleWidth && ballY + ballSize > playerY + paddleHeight/2 && ballY < playerY + paddleHeight) {
                if(ballSpeedY > 0) {
                    ballSpeedX = -ballSpeedX;
                    speedUp();
                    left.play();
                } else if(ballSpeedY < 0) {
                    ballSpeedX = -ballSpeedX;
                    ballSpeedY = -ballSpeedY;
                    speedUp();
                    left.play();
                }
            }

            //right paddle
            if(ballX > computerX - paddleWidth && ballY + ballSize > computerY && ballY < computerY + paddleHeight/2) {
                if(ballSpeedY < 0) {
                    ballSpeedX = -ballSpeedX;
                    speedUp();
                    right.play();
                } else if(ballSpeedY > 0) {
                    ballSpeedX = -ballSpeedX;
                    ballSpeedY = -ballSpeedY;
                    speedUp();
                    right.play();
                }
            } else if(ballX > computerX - paddleWidth && ballY + ballSize > computerY + paddleHeight/2 && ballY < computerY + paddleHeight) {
                if(ballSpeedY > 0) {
                    ballSpeedX = -ballSpeedX;
                    speedUp();
                    right.play();
                } else if(ballSpeedY < 0) {
                    ballSpeedX = -ballSpeedX;
                    ballSpeedY = -ballSpeedY;
                    speedUp();
                    right.play();
                }
            }
        }

        //counting points
        if(ballX < 0 - ballSize) {
            rightPoints += 1;
        } else if(ballX > cw + ballSize) {
            leftPoints += 1;
        }

        //out
        if(ballX < 0 - ballSize || ballX > cw + ballSize) {
            ballX = cw /2 - ballSize /2;
            ballY = ch /2 - ballSize /2;

            if (ballSpeedX > 0) {
                ballSpeedX = 3;
                ballSpeedY = 1;
            } else if (ballSpeedX < 0) {
                ballSpeedX = -3;
                ballSpeedY = -1;
            }

            out.play();
        }

        //checking points
        ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        if(rightPoints === 11) {
            ctx.fillText(rightWin, cw/2 + 50, ch/2);
            clearInterval(screen);
            end.play();
        } else if (leftPoints === 11) {
            ctx.fillText(leftWin, cw/2 - 350, ch/2);
            clearInterval(screen);
            end.play();
        }
    }

    function speedUp() {
        //speeding up the ball

        //speed x
        if(ballSpeedX > 0 && ballSpeedX <= 20) {
            ballSpeedX += 1;
        } else if(ballSpeedX < 0 && ballSpeedX >= -20) {
            ballSpeedX += -1;
        }

        //speed y
        if(ballSpeedY > 0 && ballSpeedY <= 10) {
            ballSpeedY += 0.7;
        } else if(ballSpeedY < 0 && ballSpeedY <= -10) {
            ballSpeedY += -0.7;
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
    };

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

    function showPoints() {
        ctx.font = "30px Arial";
        ctx.fillStyle = '#ffffff'
        ctx.fillText(leftPoints, 30, 50);
        ctx.fillText(rightPoints, 950, 50);
    }

    function game() {
        paddlesMove();
        court();
        ball();
        player();
        computer();
        showPoints();
    }


    const screen = setInterval(game, 1000 / 60);

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
});