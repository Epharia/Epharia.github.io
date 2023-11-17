import { AABB } from "../util/aabb.js";
import { Vector2D } from "../util/vector2D.js";
import { Sprite } from "./sprite.js";

export class EntityTest extends Sprite {
    constructor(x = 0, y = 0, mx = 0, my = 0) {
        super(x, y, 256, 128, mx, my);
        this.aabb.dimensions = new Vector2D(this.width, this.height);
    }

    render(ctx) {
        ctx.fillStyle = this.tempString;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}