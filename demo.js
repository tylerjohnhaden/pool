'use strict';

import { Table, Ball } from './Pool.js';
import { shootRandom, shoot } from './BallMachine.js';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

switch (window.location.hash) {
    case '#clickable':
        let ball = new Ball('white');

        document.body.addEventListener('click', (event) => {
            ball.setBallLocation(Math.random() * 2, Math.random());
        });

        break;

    case '#scrollTable':
        (async function scrollTable(rate) {
            let ball = new Ball('white');

            let shortRate = Math.max(rate, 0) + 2;
            let longRate = 2 * (Math.max(rate, 0) + 2);

            for (let i = 0; i < shortRate + 1; i++) {
                for (let j = 0; j < longRate + 1; j++) {
                    ball.setBallLocation(j / shortRate, i / shortRate);

                    await sleep(200);
                }
            }
        })(5);

        break;

    case '#billiards':
        let scale = 7;

        let table = new Table([
            new Ball('white', 0.5, 0.5),
            new Ball('yellow', 1.5, 0.5),
            new Ball('blue'),
            new Ball('red'),
            new Ball('purple'),
            new Ball('orange'),
            new Ball('green'),
            new Ball('maroon'),
            new Ball('black', 1.5, 0.5),
            new Ball('yellow'),
            new Ball('blue'),
            new Ball('red'),
            new Ball('purple'),
            new Ball('orange'),
            new Ball('green'),
            new Ball('maroon')
        ]);

        let first = true;
        table.balls.forEach(ball => {
            if (first) {
                first = false;
                shoot(ball, 0.02, 0, scale);
            } else {
                shootRandom(ball, scale);
            }
        });

        setTimeout(() => {
            (async function randomShots() {
                for (let i = 0; i < 200; i++) {
                    shootRandom(table.balls[Math.round(Math.random() * (100000)) % table.balls.length], scale);
                    await sleep(3000);
                }
            })();
        }, 2000);

        break;

    case '#random':
    default:
        shootRandom(new Ball('white', 0.5, 0.5));
}
