import { InputHandler } from './input.js';
import { World } from './world.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let isPaused = false;
    let toggledPause = false;

    canvas.width=1920;
    canvas.height=1080;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.input = new InputHandler();
            this.world = new World(this, this.input.keys);
        }
        tick(delta) {
            if(this.input.keys.includes('Escape')) {
                if(!toggledPause) {
                    isPaused = !isPaused;
                    toggledPause = true;
                }
            }
            else {toggledPause = false;}
            if(!isPaused) {
                this.world.tick(delta);
            }
        }
        render(ctx) {
            this.world.render(ctx);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            if(isPaused) ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    const game = new Game(canvas.width,canvas.height);

    let delta = 0;
    let lastTime = 0;

    function loop(time) {
        delta = (time - lastTime) / 1000;
        delta = Math.min(delta, 0.1);
        lastTime = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.tick(delta);
        game.render(ctx);

        requestAnimationFrame(loop);
    }
    this.requestAnimationFrame(loop);
});