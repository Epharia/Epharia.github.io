import { StatePause } from "./StatePause.js";
import { StateGame } from "./StateGame.js";
import { Handler } from "../handler.js";

export class State {
    static game;
    static pause;
    static current;

    static init() {
        State.game = new StateGame();
        State.pause = new StatePause();
        State.setState(State.game);
    }

    static setState(next) {
        State.current = next;
    }

    static tick() {
        State.current.tick();
    }

    static frameCtr = 0;
    static fps = 60;
    static frameTimer = 0;
    static render(ctx) {
        State.current.render(ctx);

        //TEMP (FPS output)
        ++State.frameCtr;
        State.frameTimer += Handler.delta;
        if (State.frameTimer >= 1) {
            State.fps = State.frameCtr;
            State.frameCtr = 0;
            State.frameTimer = Handler.delta;
        }

        ctx.fillStyle = 'white';
        ctx.font = "20px Arial";
        ctx.fillText(State.fps, 10, 25);
    }
}