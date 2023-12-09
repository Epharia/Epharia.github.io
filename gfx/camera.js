import { Handler } from "../handler.js";

export class Camera {
    constructor(xOffset, yOffset) {
        this.xOffset = xOffset;
		this.yOffset = yOffset;
    }

    centerOnEntity(e) {
		if (e == null) return;
		this.xOffset = Handler.game.width/2 - e.pos.x;
		this.yOffset = Handler.game.height/2 - e.pos.y;
	}

    checkLimit() { //TODO
        // if (this.xOffset > Handler.world.width/2 - Handler.game.displayW/2) {
        //     this.xOffset = Handler.world.width/2 - Handler.game.displayW/2;
        //     console.log(this.xOffset);
        // } else if (this.xOffset < -Handler.world.width/2 + Handler.game.displayW/2) {
        //     this.xOffset = -Handler.world.width/2 + Handler.game.displayW/2;
        //     console.log(this.xOffset);
        // }
    
        // if (this.yOffset < -Handler.world.height/2 + Handler.game.displayH/2) {
        //     this.yOffset = -Handler.world.height/2 + Handler.game.displayH/2;
        // } else if (this.yOffset > Handler.world.height/2 - Handler.game.displayH/2) {
        //     this.yOffset = Handler.world.height/2 - Handler.game.displayH/2;
        // }
	}

    move(x = 0, y = 0) {
		this.xOffset += x;
		this.yOffset += y;
	}

    get x() {
        return this.xOffset;
    }

    get y() {
        return this.yOffset;
    }
}