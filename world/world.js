import { EntityManager } from "../entities/handler/entityManager.js";
import { EntityTest } from "../entities/entityTest.js";
import { Player } from "../entities/player.js";
import { CollisionHandler } from "../entities/handler/collisionHandler.js";
import { Camera } from "../gfx/camera.js";
import { Tilemap } from "../tiles/tilemap.js";

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
        this.load();

        this.player = new Player();
        let test = new EntityTest(1000, this.height-64*10);

        this.entities.add(test, this.player);
    }

    load(map = "test") {
        fetch("./world/maps/" + map + ".json").then((res) => {return res.json()}).then((data) => {
            this.width = data.width * 64;
            this.height = data.height * 64;
            this.layer1.load(data.layer1);
        });
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