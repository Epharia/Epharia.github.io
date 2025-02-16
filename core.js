import { Handler } from './handler.js';
import { Conf } from './config.js';
import { State } from './states/State.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = Conf.WIDTH;
    canvas.height = Conf.HEIGHT;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            State.init();
            Handler.init(this);
        }

        tick() {
            State.tick();
        }

        render(ctx) {
            State.render(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    function loop(time) {
        Handler.delta = (time - lastTime) / 1000;
        Handler.delta = Math.min(Handler.delta, 0.1);
        lastTime = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.tick();
        game.render(ctx);

        ctx.resetTransform();

        requestAnimationFrame(loop);
    }
    this.requestAnimationFrame(loop);
});