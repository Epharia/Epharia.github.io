import { EntityManager } from "./entities/handler/entityManager.js";
import { EntityTest } from "./entities/entityTest.js";
import { Player } from "./entities/player.js";
import { Handler } from "./handler.js";
import { CollisionHandler } from "./entities/handler/collisionHandler.js";
import { Camera } from "./gfx/camera.js";

export class World {
    constructor() {
        this.width = 2200;
        this.height = 2000;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler();
        this.camera = new Camera();

        this.player = new Player();
        let test = new EntityTest(200, Handler.height-64);
        // let test2 = new EntityTest( 0, Handler.height-64, 500, -2000);

        this.entities.add(test, this.player);
    }

    tick() {
        this.entities.tick();
        this.collisionHandler.process(this.entities);
        this.camera.centerOnEntity(this.player);
        this.camera.checkLimit();
    }

    render(ctx) {
        ctx.translate(this.camera.x, this.camera.y);

        this.entities.render(ctx);
    }
}