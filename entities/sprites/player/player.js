import { Handler } from "../../../handler.js";
import { Sprite } from "../sprite.js";

export class Player extends Sprite {
    constructor() {
        super(20, Handler.height - 84);

        this.ctr = 0;
        this.max = 50;
        this.lastPos = [];
        this.cooldown = 0;

        this.speed = 750;
        this.acc = 100;
        this.modifier_air; //TODO

        this.facing = 0;

        // this.img = new Image();
        // this.img.src = "./assets/sprites/player.png";
    }

    tick() {
        this.move();
        this.gravity();

        //Update Positon
        super.updatePosition();

        if (this.cooldown > 0) return;
        this.lastPos.push(this.pos.copy);
        while (this.lastPos.length > this.max) {
            this.lastPos.shift();
        }
    }

    move() {
        //Horizontal Movement
        let left = Handler.input.keys.left.held,
            right = Handler.input.keys.right.held;
        if (right && !left) {
            this.facing = 1;
        } else if (!right && left) {
            this.facing = -1;
        } else {
            this.facing = 0;
        }

        if (this.cooldown <= 0) {
            if (Handler.input.keys.time.pressed) {
                this.cooldown = 100;
                this.pos = this.lastPos[0];
                this.lastPos = [];
            }
        } else {
            --this.cooldown;
        }

        if (this.grounded && Handler.input.keys.jump.pressed) {
            this.momentum.y -= 1750;
            this.grounded = false;
        }

        if (this.facing == 0) {
            let sign = Math.sign(this.momentum.x);
            if (this.momentum.x * sign > 50) {
                this.momentum.x -= 50 * sign;
            } else {
                this.momentum.x = 0;
            }
        }

        this.momentum.x += this.facing * this.acc;
        if (this.momentum.x * this.facing > this.speed) this.momentum.x = this.facing * this.speed;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        super.render(ctx);
        let last = this.lastPos[0];
        if (last != null || this.cooldown <= 0) {
            ctx.fillStyle = "rgba(100, 100, 100)";
            ctx.fillRect(last.x, last.y, this.width, this.width);
        }

        ctx.fillStyle = "rgba(255, 255, 255)";
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        // ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
}