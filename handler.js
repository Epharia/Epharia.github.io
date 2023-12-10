import { InputHandler } from './input.js';
import { World } from './world.js';

export class Handler {
    static delta;

    static game;
    static input;
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

    static get canvasWidth() {
        return Handler.game.width;
    }

    static get canvasHeight() {
        return Handler.game.height;
    }
}