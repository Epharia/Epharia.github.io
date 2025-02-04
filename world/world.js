import { EntityManager } from "../entities/handler/entityManager.js";
import { CollisionHandler } from "../entities/handler/collisionHandler.js";
import { Player } from "../entities/sprites/player/player.js";
import { Camera } from "../gfx/camera.js";
import { Sprite } from "../entities/sprites/sprite.js";
import { Tilemap } from "./tiles/tilemap.js";

export class World {
    constructor() {
        this.width = 1920;
        this.height = 1080;

        this.entities = new EntityManager();
        this.collisionHandler = new CollisionHandler(this.width, this.height);
        this.camera = new Camera();
    }

    init() {
        this.layer1 = new Tilemap(); //TODO make dynamic
        this.load();
        this.player = new Player();

        this.entities.add(this.player);

        //TEMP(Delete later)
        for (let i = 0; i < 5; ++i) {
            this.entities.add(new Sprite(i * (64 + 10), this.height - 64));
        }
    }

    load(map = "test") {
        fetch("./world/maps/" + map + ".json").then((res) => { return res.json() }).then((data) => {
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