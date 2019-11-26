function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export class Table {
    constructor(balls) {
        this.balls = balls;
    }

    getCollisions() {
        let collisions = [];

        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                if (this.isCollision(this.balls[i], this.balls[j])) {
                    collisions.push([ballA, ballB]);
                }
            }
        }

        return collisions;
    }

    isCollision(ballA, ballB) {
        let [longA, shortA] = getTableLocation(ballA.long, ballA.short);
        let [longB, shortB] = getTableLocation(ballB.long, ballB.short);

        return distance(longA, shortA, longB, shortB) <= 0.006944444;
    }
}

export class Ball {
    constructor(color, long, short) {
        this.ballElement = document.createElement('div');
        this.ballElement.className = 'ball';

        if (color && color.length > 0) {
            this.defaultColor = color;
        } else {
            this.defaultColor = this.ballElement.style.background;
        }

        this.setColor(this.defaultColor);
        this.setBallLocation(long || 0.5, short || 0.5);

        document.body.appendChild(this.ballElement);
    }

    setBallLocation(long, short) {
        if (short < 0 || short > 1 || long < 0 || long > 2) {
            alert(
                'Unfortunately there is a problem, it appears that ' +
                'the ball is trying to go to a place beyond the table! ' +
                'short [' + short + '] (should be between 0 and 1), ' +
                'short [' + long + '] (should be between 0 and 2)'
            );
        }

        this.long = long;
        this.short = short;

// these work atm
//        this.ballElement.style.top = 'calc(' + (33.3333 * short).toString() + 'vh + 33.3333vh - 0.6944444vh)';
//        this.ballElement.style.left = 'calc(' + (33.3333 * long).toString() + 'vh + 50vw - 33.3333vh - 0.6944444vh)';

// slight optimization
        this.ballElement.style.top = 'calc(' + (33.3333 * short).toString() + 'vh + 32.6389vh)';
        this.ballElement.style.left = 'calc(' + (33.3333 * long).toString() + 'vh + 50vw - 34.0277vh)';
    }

    setColor(color) {
        this.ballElement.style.background = color;
    }

    equals(ball) {
        return this.ballElement === ball.ballElement;
    }
}

export function getTableLocation(long, short) {
    long = Math.abs(long) % 4;
    short = Math.abs(short) % 2;

    if (long < 0 || short < 0) {
        console.log(long, short, 'negative');
    }

    if (long > 2) {
        long = 4 - long;
    }

    if (short > 1) {
        short = 2 - short;
    }

    return [long, short];
}
