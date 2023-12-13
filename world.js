import { EntityManager } from "./entities/handler/entityManager.js";
import { EntityTest } from "./entities/entityTest.js";
import { Player } from "./entities/player.js";
import { CollisionHandler } from "./entities/handler/collisionHandler.js";
import { Camera } from "./gfx/camera.js";
import { Tilemap } from "./tiles/tilemap.js";

export class World {
    constructor() {
        this.width = 50 * 64;
        this.height = 40 * 64;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler(this.width, this.height);
        this.camera = new Camera();

        this.layer1 = new Tilemap();
    }

    init() {
        this.layer1.load();

        this.player = new Player();
        let test = new EntityTest(1000, this.height-64*10);

        // let test2 = new EntityTest(500, this.height-64);
        // this.entities.add(new EntityTest(350, this.height-64), new EntityTest(120, this.height-64), new EntityTest(15, this.height-64), new EntityTest(250, this.height-64), test, test2, this.player);
        this.entities.add(test, this.player);
    }

    tick() {
        this.entities.tick();
        this.collisionHandler.process(this.entities.list);
        this.camera.centerOnEntity(this.player);
        this.camera.checkLimit();
    }

    render(ctx) {
        this.layer1.render(ctx);
        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        this.entities.render(ctx);
        ctx.restore();
    }
}