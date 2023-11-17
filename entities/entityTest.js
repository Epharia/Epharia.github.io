import { Sprite } from "./sprite.js";

export class EntityTest extends Sprite {
    constructor(x, y, mx, my) {
        super(x, y, 64, 64, mx, my);
    }

    render(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}