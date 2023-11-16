import { Sprite } from "./sprite.js";

export class Player extends Sprite {
    constructor(game, input) {
        super(game, 20, 0, 64, 64, 0, 0);

        this.input = input

        this.pos.y = this.game.height - this.height;

        this.speed = 750;

        this.toggledJump = false;
        this.jumpBuffer = 0;

        this.hasDash = true;
        this.toggledDash = false;
        this.dashTimer = 0;
        
        this.isFaceRight = true;

        this.img = new Image();
        this.img.src = "./assets/player.png";
    }

    tick(delta) {
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
                this.momentum.y = -1200 - Math.min(this.speed, Math.abs(this.momentum.x))*0.3;
                this.onGround = false;
                this.jumpBuffer = 0;
            }
            --this.jumpBuffer;
        }

        //Horizontal Movement
        let left = this.input.includes('KeyA'), right = this.input.includes('KeyD');
        if(right && !left) {
            this.momentum.x += 3000 * delta;
            if(this.dashTimer<=0) this.isFaceRight = true;
        } else if(!right && left) {
            this.momentum.x -= 3000 * delta;
            if(this.dashTimer<=0) this.isFaceRight = false;
        } else if(Math.abs(this.momentum.x) > 1) {
            if(this.onGround) this.momentum.x += Math.sign(this.momentum.x) * -1000 * delta;
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
            this.momentum.x = 2000 * (this.isFaceRight ? 1 : -1);
        } else {
            //Limit speed if not dashing
            if(this.momentum.x > this.speed)  this.momentum.x = this.speed;
            else if(this.momentum.x < (-1 * this.speed)) this.momentum.x = -1 * this.speed;
        }

        if(this.dashTimer > -15) --this.dashTimer;

        //Update Positon
        super.updatePosition(delta);

        //Gravity
        let fallingCoef = (jump ? 1 : 2);
        let jumpCoef = (jump ? 1 : 4);
        if(this.momentum.y < 1200 * fallingCoef)
            this.momentum.y += 2500 * delta * (this.momentum.y < 0 ? jumpCoef : fallingCoef);
        else this.momentum.y = 1200 * fallingCoef;
    }

    render(ctx) {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
}