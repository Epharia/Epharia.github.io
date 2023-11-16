export class EntityManager {
    constructor() {
        this.entities = [];
    }

    tick(delta) {
        this.entities.forEach(e => {
            e.tick(delta);
        });
    }

    render(ctx) {
        this.entities.forEach(e => {
            e.render(ctx);
        });
    }

    add(...e) {
        this.entities.push(...e);
    }
}