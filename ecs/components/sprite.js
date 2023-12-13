import { Vector2D } from "../../util/vector2D.js";
import { Component } from "../component.js";

export class Sprite extends Component {
    constructor(x, y) {
        super();

        this.pos = new Vector2D(x, y);
        this.velocity = new Vector2D();
    }
}