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
        this.tempString = 'red';
    }

    tick() {
        this.updatePosition();
        this.gravity();
    }

    updatePosition() {
        if(this.checkCollision()) {this.tempString = 'green';}
        else {this.tempString = 'red';}

        this.pos.addScaled(this.momentum, Handler.delta);

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

    checkCollision() {
        let col = false;
        let entities = Handler.world.entities.entities;
        entities.filter(e => e.aabb !== undefined && e !== this).forEach(target => {
            if(this.aabb.at(this.pos).intersects(target.aabb.at(target.pos))) {
                col = true;
            }
        });
        return col;
    }
}