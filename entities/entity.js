export class Entity {
    constructor(x, y) {
        this.pos = {x: x, y: y};
    }

    tick() {}
    render(ctx) {}
}