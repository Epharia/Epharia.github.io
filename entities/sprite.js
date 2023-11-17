import { Handler } from '../handler.js';
import { Entity } from './entity.js';

export class Sprite extends Entity {
    constructor(x, y, width, height, momentumX, momentumY) {
        super(x, y)
        this.width = width;
        this.height = height;
        this.momentum = {x: momentumX, y: momentumY};
        this.onGround = true;
    }

    tick() {
        this.updatePosition();
        this.gravity();
    }

    updatePosition() {
        this.pos.x += this.momentum.x * Handler.delta;
        this.pos.y += this.momentum.y * Handler.delta;;

        //Bounds (TEMP CODE)
        if(this.pos.y > Handler.height - this.height) {
            this.pos.y = Handler.height - this.height;
            this.onGround = true;
            this.momentum.y = 0;
        } else if(this.pos.y < 0) {
            this.pos.y = 0;
            this.momentum.y = 0;
        }

        if(this.pos.x < 0) {
            this.pos.x = 0;
            this.momentum.x = 0;
        } else if(this.pos.x > Handler.width - this.width) {
            this.pos.x = Handler.width - this.width;
            this.momentum.x = 0;
        }
    }

    gravity() {
        this.momentum.y += 4000 * Handler.delta;
    }
}