import { EntityManager } from "./entities/handler/entityManager.js";
import { EntityTest } from "./entities/entityTest.js";
import { Player } from "./entities/player.js";
import { Handler } from "./handler.js";
import { CollisionHandler } from "./entities/handler/collisionHandler.js";

export class World {
    constructor() {
        this.width = 1920;
        this.height = 1080;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler();

        let player = new Player();
        let test = new EntityTest(200, Handler.height-64);
        let test2 = new EntityTest( 0, Handler.height-64, 500, -2000);

        this.entities.add(test, player);
    }

    tick() {
        this.entities.tick();
        this.collisionHandler.process(this.entities);
    }

    render(ctx) {
        this.entities.render(ctx);
    }
}