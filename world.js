import { EntityManager as EntityManager } from "./Entities/entityManager.js";
import { EntityTest } from "./Entities/entityTest.js";
import { Player } from "./Entities/player.js";

export class World {
    constructor(game, input) {
        this.entities = new EntityManager();

        let player = new Player(game, input);
        let test = new EntityTest(game, 0, game.height-64, 600, -1000);
        let test2 = new EntityTest(game, 0, game.height-64, 500, -2000);

        this.entities.add(player);
    }

    tick(delta) {
        this.entities.tick(delta);
    }

    render(ctx) {
        this.entities.render(ctx);
    }
}