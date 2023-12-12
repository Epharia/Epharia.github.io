import { EntityManager } from "./entities/handler/entityManager.js";
import { EntityTest } from "./entities/entityTest.js";
import { Player } from "./entities/player.js";
import { CollisionHandler } from "./entities/handler/collisionHandler.js";
import { Camera } from "./gfx/camera.js";
import { Tilemap } from "./tiles/tilemap.js";

export class World {
    constructor() {
        this.width = 3000;
        this.height = 2000;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler(this.width, this.height);
        this.camera = new Camera();

        this.tilemap = new Tilemap();
    }

    init() {
        this.player = new Player();
        let test = new EntityTest(200, this.height-64);
        let test2 = new EntityTest(500, this.height-64);

        this.entities.add(new EntityTest(280, this.height-64), new EntityTest(120, this.height-64), new EntityTest(15, this.height-64), new EntityTest(1000, this.height-64), test, test2, this.player);
    }

    tick() {
        this.entities.tick();
        this.collisionHandler.process(this.entities);
        this.camera.centerOnEntity(this.player);
        this.camera.checkLimit();
    }

    render(ctx) {
        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        this.entities.render(ctx);
        this.collisionHandler.show(ctx);
        ctx.restore();
    }
}