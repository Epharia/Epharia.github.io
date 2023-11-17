import { EntityManager } from "./entities/entityManager.js";
import { EntityTest } from "./entities/entityTest.js";
import { Player } from "./entities/player.js";
import { Handler } from "./handler.js";

export class World {
    constructor() {
        this.entities = new EntityManager();

        let player = new Player();
        let test = new EntityTest(200, Handler.height-64);
        let test2 = new EntityTest( 0, Handler.height-64, 500, -2000);

        this.entities.add(test, player);
    }

    tick() {
        this.entities.tick();
    }

    render(ctx) {
        this.entities.render(ctx);
    }
}