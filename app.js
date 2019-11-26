'use strict';

import { Ball, Table } from './Pool.js';
import { shootRandom, shoot } from './BallMachine.js';
import { sleep } from './util.js';

let canvas = document.getElementById('sketchRoom');
let ctx = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 1;
ctx.strokeStyle = 'black';

function drawLine(x0, y0, x1, y1) {
    console.log(x0, y0, x1, y1);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawLinesFromBall(ball, vx, vy) {
    drawLine(ball.long, ball.short, ball.long + (vx * 100000), ball.short + (vy * 100000));
}



// build balls
let red = new Ball('red', 0.5, 0.5);
//let blue = new Ball('blue', 0.5, 0.5);

let table = new Table([red]);

drawLinesFromBall(red, .1, .01);
shoot(red, .1, .01);

//document.body.addEventListener('click', (event) => {
//    shootRandom(red);
//    shootRandom(blue);
//});
//
//shootRandom(red);
//shootRandom(blue);


