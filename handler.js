import { InputHandler } from './input.js';
import { World } from './world/world.js';

export class Handler {
    /** @type {Number} */
    static delta;
    static game;

    /** @type {InputHandler} */
    static input;

    /** @type {World} */
    static world;

    static init(game) {
        Handler.game = game;
        Handler.input = new InputHandler();
        Handler.world = new World();
        Handler.world.init();
    }

    static get height() {
        return Handler.world.height;
    }

    static get width() {
        return Handler.world.width;
    }

    /**
     * @deprecated
     */
    static get canvasWidth() { //TODO remove and use canvas.width
        return Handler.game.width;
    }

    /**
     * @deprecated
     */
    static get canvasHeight() {
        return Handler.game.height;
    }
}