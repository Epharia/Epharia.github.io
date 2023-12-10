import { Handler } from "../handler.js";

export class Camera {
    constructor(xOffset, yOffset) {
        this.xOffset = xOffset;
		this.yOffset = yOffset;
    }

    centerOnEntity(e) {
		if (e == null) return;
		this.xOffset = e.pos.x + e.width/2 - Handler.game.width/2;
		this.yOffset = e.pos.y + e.height/2 - Handler.game.height/2;
	}

    checkLimit() {
        if (this.xOffset < 0) {
            this.xOffset = 0;
        } else if (this.xOffset > Handler.width - Handler.canvasWidth) {
            this.xOffset = Handler.width - Handler.canvasWidth;
        }
    
        if (this.yOffset < 0) {
            this.yOffset = 0;
        } else if (this.yOffset > Handler.height - Handler.canvasHeight) {
            this.yOffset = Handler.height - Handler.canvasHeight;
        }
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