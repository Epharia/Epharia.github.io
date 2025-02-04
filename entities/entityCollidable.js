import { Entity } from "./entity.js";
import { AABB } from "../util/aabb.js";
import { Vector2D } from "../util/vector2D.js";

export class EntityCollidable extends Entity {
    constructor(x = 0, y = 0, width = 64, height = 64) {
        super(x, y)
        this.width = width;
        this.height = height;

        this.aabb = new AABB();
        this.aabb.dimensions = new Vector2D(this.width, this.height);
    }

    /**
    * check collision between this sprite and another
    * @param {EntityCollidable} other 
    */
    checkCollision(other) {
        return this.aabb.at(this.pos).intersects(other.aabb.at(other.pos));
    }

    /**
     * called on collision
     * @abstract
     * @param {EntityCollidable} other 
     */
    onCollision(other) { }
}