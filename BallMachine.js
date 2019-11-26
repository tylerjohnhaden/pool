import { getTableLocation } from './pool.js';
import { sleep } from './util.js';

// Binomial Distribution
// https://stackoverflow.com/a/49434653
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
}

export async function shootRandom(ball, normalizedScale) {
    console.log('r', normalizedScale);
    shoot(ball, 0.1 * (randn_bm() - 0.5), 0.1 * (randn_bm() - 0.5), normalizedScale);
}

export async function shoot(ball, vx0, vy0, normalizedScale) {

    normalizedScale = normalizedScale || 40;  // should be between 0 and 100

    console.log(normalizedScale);

    (async function runTime(scale) {
        let px = ball.long;
        let py = ball.short;

        let vx = vx0;
        let vy = vy0;

        for (let time = 0; time < Math.pow(2, 11); time++) {
            px += vx;
            py += vy;

            vx = vx0 / Math.exp(time / scale);
            vy = vy0 / Math.exp(time / scale);

            let [ppx, ppy] = getTableLocation(px, py);

            ball.setBallLocation(ppx, ppy);

            await sleep(2);
        }
    })(15000 * (0.002 + (0.001 * normalizedScale)));  // should be on range [780, 30], [1530, 30] is also fine, but less realistic
}
