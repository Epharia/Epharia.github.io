import { Entity } from './Entity.js';

export class Sprite extends Entity {
    constructor(game, x, y, width, height, momentumX, momentumY) {
        super(game, x, y)
        this.width = width;
        this.height = height;
        this.momentum = {x: momentumX, y: momentumY};
        this.onGround = true;
    }

    tick(delta) {
        this.updatePosition(delta);
        this.gravity(delta);
    }

    updatePosition(delta) {
        this.pos.x += this.momentum.x * delta;
        this.pos.y += this.momentum.y * delta;

        //Bounds (TEMP CODE)
        if(this.pos.y > this.game.height - this.height) {
            this.pos.y = this.game.height - this.height;
            this.onGround = true;
            this.momentum.y = 0;
        } else if(this.pos.y < 0) {
            this.pos.y = 0;
            this.momentum.y = 0;
        }

        if(this.pos.x < 0) {
            this.pos.x = 0;
            this.momentum.x = 0;
        } else if(this.pos.x > this.game.width - this.width) {
            this.pos.x = this.game.width - this.width;
            this.momentum.x = 0;
        }
    }

    gravity(delta) {
        this.momentum.y += 4000 * delta
    }
}