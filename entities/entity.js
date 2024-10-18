import { Vector2D } from "../util/vector2D.js";

export class Entity {
    constructor(x, y) {
        this.pos = new Vector2D(x, y);
    }

    tick() {}
    render(ctx) {}
}