import { Handler } from '../../handler.js';
import { Vector2D } from '../../util/vector2D.js';
import { EntityCollidable } from '../entityCollidable.js';

export class Sprite extends EntityCollidable {
    constructor(x = 0, y = 0, width = 64, height = 64, momentumX = 0, momentumY = 0) {
        super(x, y, width, height)

        this.momentum = new Vector2D(momentumX, momentumY);

        this.color = 'black';
        this.grounded = false;
    }

    render(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    tick() {
        this.updatePosition();
        this.color = 'black';
    }

    updatePosition() {
        this.pos.addScaled(this.momentum, Handler.delta);

        //Bounds (TEMP CODE)
        if (this.pos.y > Handler.world.height - this.height) {
            this.pos.y = Handler.world.height - this.height;
            this.momentum.y = 0;
            this.grounded = true;
        } else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.momentum.y = 0;
        }

        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.momentum.x = 0;
        } else if (this.pos.x > Handler.world.width - this.width) {
            this.pos.x = Handler.world.width - this.width;
            this.momentum.x = 0;
        }
    }

    gravity() {
        let G = 4000;
        this.momentum.addScaled(Vector2D.down.multiply(G), Handler.delta)
    }

    /**
     * @override
     * @param {Sprite} other 
     */
    onCollision(other) { /*TODO*/ }
}