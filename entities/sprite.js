import { Handler } from '../handler.js';
import { AABB } from '../util/aabb.js';
import { Vector2D } from '../util/vector2D.js';
import { Entity } from './entity.js';

export class Sprite extends Entity {
    constructor(x = 0, y = 0, width = 64, height = 64, momentumX = 0, momentumY = 0) {
        super(x, y)
        this.width = width;
        this.height = height;
        
        this.momentum = new Vector2D(momentumX, momentumY);
        this.onGround = true;

        this.aabb = new AABB();
        this.aabb.dimensions = new Vector2D(this.width, this.height);

        this.color = 'red';
    }

    tick() {
        this.updatePosition();
        this.gravity();

        this.color = 'red';
    }

    updatePosition() {
        this.pos.addScaled(this.momentum, Handler.delta);

        //Bounds (TEMP CODE)
        if(this.pos.y > Handler.world.height - this.height) {
            this.pos.y = Handler.world.height - this.height;
            this.onGround = true;
            this.momentum.y = 0;
        } else if(this.pos.y < 0) {
            this.pos.y = 0;
            this.momentum.y = 0;
        }

        if(this.pos.x < 0) {
            this.pos.x = 0;
            this.momentum.x = 0;
        } else if(this.pos.x > Handler.world.width - this.width) {
            this.pos.x = Handler.world.width - this.width;
            this.momentum.x = 0;
        }
    }
d
    gravity() {
        this.momentum.y += 4000 * Handler.delta;
    }

    checkCollision(target) {
        if (target === Handler.world.player) this.color = 'blue';
        if(this.aabb.at(this.pos).intersects(target.aabb.at(target.pos))) {
            this.color = 'GREEN';
        }
    }
}