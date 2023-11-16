export class Entity {
    constructor(game, x, y) {
        this.game = game;
        this.pos = {x: x, y: y};
    }

    tick(delta) {}
    render(ctx) {}
}