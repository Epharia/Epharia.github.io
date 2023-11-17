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
        Handler.world = new World(this, this.input.keys);
    }

    static get height() {
        return Handler.game.height;
    }

    static get width() {
        return Handler.game.width;
    }
}