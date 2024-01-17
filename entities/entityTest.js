import { Sprite } from "./sprite.js";

export class EntityTest extends Sprite {
    constructor(x = 0, y = 0, mx = 0, my = 0) {
        super(x, y, 64, 64, mx, my);

        this.img = new Image();
        this.img.src = "./assets/sprites/mimic.png";
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        super.render(ctx);
        ctx.drawImage(this.img, this.pos.x, this.pos.y);
    }
}