import { Handler } from "../handler.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite {
    constructor() {
        super(20, Handler.height-84);

        this.input = Handler.input.keys;
        
        this.speed = 500;

        this.toggledDash = false;
        this.dashTimer = 0;
        
        this.facingH = 0;
        this.facingV = 0;

        this.img = new Image();
        this.img.src = "./assets/sprites/player.png";
    }

    tick() {
        //Horizontal Movement
        let left = this.input.includes('KeyA'), right = this.input.includes('KeyD');
        if(right && !left) {
            if(this.dashTimer<=0) this.facingH = 1;
        } else if(!right && left) {
            if(this.dashTimer<=0) this.facingH = -1;
        } else {
            if(this.dashTimer<=0) this.facingH = 0;
        }

        //Horizontal Movement
        let up = this.input.includes('KeyW'), down = this.input.includes('KeyS');
        if(up && !down) {
            if(this.dashTimer<=0) this.facingV = -1;
        } else if(!up && down) {
            if(this.dashTimer<=0) this.facingV = 1;
        } else {
            this.momentum.y = 0;
            if(this.dashTimer<=0) this.facingV = 0;
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

        this.momentum.x = this.facingH;
        this.momentum.y = this.facingV;

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