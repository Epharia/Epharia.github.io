import { Handler } from "../handler.js";
import { State } from "./State.js";

export class StateGame {

    tick() {
        if (Handler.input.keys.pause.pressed) {
            State.setState(State.pause);
        }
        Handler.world.tick();
    }

    render(ctx) {
        Handler.world.render(ctx);
    }
}