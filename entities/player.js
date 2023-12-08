import { Handler } from "../handler.js";
import { Sprite } from "./sprite.js";

export class Player extends Sprite { //TODO REWORK (use Vector2D)
    constructor() {
        super(20, Handler.height);

        this.input = Handler.input.keys;
        
        this.speed = 750;

        this.jumpPower = 1200
        this.toggledJump = false;
        this.jumpBuffer = 0;

        this.hasDash = true;
        this.toggledDash = false;
        this.dashTimer = 0;
        
        this.facing = 1;

        this.img = new Image();
        this.img.src = "./assets/player.png";
    }

    tick() {
        //Reset Dash
        if(this.onGround && this.dashTimer <= 0) {
            this.hasDash = true;
        }
        
        //Jump
        let jump = this.input.includes('Space') || this.input.includes('KeyJ');
        if(jump) {
            if(!this.toggledJump) {
                this.toggledJump = true;
                this.jumpBuffer = 6;
            }
        } else {
            this.toggledJump = false;
        }

        if(this.jumpBuffer > 0) {
            if(this.onGround  && this.dashTimer <= 0) {
                this.momentum.y = -this.jumpPower - Math.min(this.speed, Math.abs(this.momentum.x))*0.3;
                this.onGround = false;
                this.jumpBuffer = 0;
            }
            --this.jumpBuffer;
        }

        //Horizontal Movement
        let left = this.input.includes('KeyA'), right = this.input.includes('KeyD');
        if(right && !left) {
            this.momentum.x += 3000 * Handler.delta;
            if(this.dashTimer<=0) this.facing = 1;
        } else if(!right && left) {
            this.momentum.x -= 3000 * Handler.delta;
            if(this.dashTimer<=0) this.facing = -1;
        } else if(Math.abs(this.momentum.x) > 1) {
            if(this.onGround) this.momentum.x += Math.sign(this.momentum.x) * -1000 * Handler.delta;
        } else this.momentum.x = 0;

        //Dash
        let dash = this.input.includes('ShiftLeft') || this.input.includes('KeyI');
        if(dash) {
            if (this.hasDash && this.dashTimer <= -15 && !this.toggledDash) {
                this.toggledDash = true;
                this.hasDash = false;
                this.dashTimer = 12;
            }
        } else {
            this.toggledDash = false;
        }

        if(this.dashTimer > 0) {
            this.momentum.y = 0;
            this.momentum.x = 2000 * this.facing;
        } else {
            //Limit speed if not dashing
            if(this.momentum.x > this.speed)  this.momentum.x = this.speed;
            else if(this.momentum.x < (-1 * this.speed)) this.momentum.x = -1 * this.speed;
        }

        if(this.dashTimer > -15) --this.dashTimer;

        //Update Positon
        super.updatePosition();

        //Gravity
        let fallingCoef = (jump ? 1 : 2);
        let jumpCoef = (jump ? 1 : 4);
        if(this.momentum.y < 1200 * fallingCoef)
            this.momentum.y += 2500 * Handler.delta * (this.momentum.y < 0 ? jumpCoef : fallingCoef);
        else this.momentum.y = 1200 * fallingCoef;
    }

    render(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
}