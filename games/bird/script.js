;( () => {
    'use strict'

    const get = (target) => document.querySelector(target)

    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");

    const bird = new Image();
    const bg = new Image();
    const fg = new Image();
    const pipeNorth = new Image();
    const pipeSouth = new Image();

    bird.src = "./images/bird.png";
    bg.src = "./images/bg.png";
    fg.src = "./images/fg.png";
    pipeNorth.src = "./images/pipeNorth.png";
    pipeSouth.src = "./images/pipeSouth.png";

    const gap = 120;
    const constant = 300 + gap;

    let score = 0;
    let bX = 30;
    let bY = 150;
    const gravity = 1.5;

    document.addEventListener('keydown', moveUp);

    function moveUp(){
        bY -= 20;
    }

    let pipe = [];

    pipe[0] = {
        x : cvs.width,
        y : 0
    }

    const pipeMove = () => {
        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

            pipe[i].x--;

            if (pipe[i].x == 250) {
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                })
            }

            // 부딪힌 경우
            if (bX + bird.width >= pipe[i].x && 
                bX <= pipe[i].x + pipeNorth.width &&
                (bY <= pipe[i].y + pipeNorth.height ||
                 bY + bird.height >= pipe[i].y + constant) ||
                bY + bird.height >= cvs.height - fg.height) {
                    location.reload();
            }

            if (pipe[i].x == 5) {
                score++;
            }
        }
    }

    const draw = () => {
        ctx.drawImage(bg, 0, 0);

        pipeMove();

        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, bX, bY);
        console.log(cvs.height);

        bY += gravity;

        ctx.fillStyle = "#000";
        ctx.font = "28px Verdana";
        ctx.fillText("Score : " + score, 10, cvs.height-20);

        requestAnimationFrame(draw);
    }

    const init = () => {
        draw();
    }

    init()
})()