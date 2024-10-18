import { EntityManager } from "../entities/handler/entityManager.js";
import { CollisionHandler } from "../entities/handler/collisionHandler.js";
import { Player } from "../entities/sprites/player/player.js";
import { Camera } from "../gfx/camera.js";

export class World {
    constructor() {
        this.width = 1920;
        this.height = 1080;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler(this.width, this.height);
        this.camera = new Camera();
    }

    init() {
        this.load();
        this.player = new Player();

        this.entities.add(this.player);
    }

    load(map = "test") {
    }

    tick() {
        this.entities.tick();
        this.collisionHandler.process(this.entities.list);
        this.camera.centerOnEntity(this.player);
        this.camera.checkLimit();
    }

    render(ctx) {
        ctx.save();
        ctx.translate(-this.camera.x, -this.camera.y);
        this.entities.render(ctx);
        ctx.restore();
    }
}