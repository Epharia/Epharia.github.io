import { Handler } from "../handler.js";
import { Vector2D } from "../util/vector2D.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite {
    constructor() {
        super(20, Handler.height-84);

        this.input = Handler.input.keys;
        
        this.speed = 500;

        this.toggledDash = false;
        this.dashTimer = 0;
        
        this.facing = new Vector2D();

        this.img = new Image();
        this.img.src = "./assets/sprites/player.png";
    }

    tick() {
        //Horizontal Movement
        let left = this.input.includes('KeyA') || this.input.includes('ArrowLeft'),
        right = this.input.includes('KeyD') || this.input.includes('ArrowRight');
        if(right && !left) {
            if(this.dashTimer<=0) this.facing.x = 1;
        } else if(!right && left) {
            if(this.dashTimer<=0) this.facing.x = -1;
        } else {
            if(this.dashTimer<=0) this.facing.x = 0;
        }

        //Horizontal Movement
        let up = this.input.includes('KeyW') || this.input.includes('ArrowUp'),
        down = this.input.includes('KeyS') || this.input.includes('ArrowDown');
        if(up && !down) {
            if(this.dashTimer<=0) this.facing.y = -1;
        } else if(!up && down) {
            if(this.dashTimer<=0) this.facing.y = 1;
        } else {
            this.momentum.y = 0;
            if(this.dashTimer<=0) this.facing.y = 0;
        }

        //Dash
        let dash = this.input.includes('ShiftLeft') || this.input.includes('KeyI');
        if(dash) {
            if (this.dashTimer <= -15 && !this.toggledDash) {
                this.toggledDash = true;
                this.dashTimer = 12;
            }
        } else {
            this.toggledDash = false;
        }

        this.momentum = this.facing.copy;

        this.momentum.normalize();
        this.momentum.multiply(this.dashTimer > 0 ? 2000 : this.speed);

        if(this.dashTimer > -15) --this.dashTimer;

        //Update Positon
        super.updatePosition();
    }

    render(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
}