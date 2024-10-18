import { Handler } from './handler.js';
import { Conf } from './config.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let isPaused = false;
    let toggledPause = false;

    let frameCtr = 0;
    let fps = 60;
    let frameTimer = 0;

    canvas.width = Conf.WIDTH;
    canvas.height = Conf.HEIGHT;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;

            Handler.init(this);
        }

        tick() {
            // if(Handler.input.keys.includes('Escape')) {
            //     if(!toggledPause) {
            //         isPaused = !isPaused;
            //         toggledPause = true;
            //     }
            // }
            // else {toggledPause = false;}
            if(!isPaused) {
                Handler.world.tick();
            }
        }

        render(ctx) {
            ++frameCtr;

            //GAME
            Handler.world.render(ctx);

            //UI
            if(isPaused) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            //TEMP (FPS output)
            frameTimer += Handler.delta;
            if(frameTimer >= 1) {
                fps = frameCtr;
                frameCtr = 0;
                frameTimer = Handler.delta;
            }
            
            ctx.fillStyle = 'white';
            ctx.font = "20px Arial";
            ctx.fillText(fps, 10, 25);
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