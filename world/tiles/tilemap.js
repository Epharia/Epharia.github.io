import { Handler } from "../../handler.js";
import { TilePalette } from "./tilepalette.js";

const tileSize = 64;

export class Tilemap {
    constructor() {
        this.palette = new TilePalette();
        this.palette.load();
        this.tiles = [];
    }

    load(tiles) {
        for (let x = 0; x * tileSize < Handler.width; ++x) {
            this.tiles[x] = [];
            for (let y = 0; y * tileSize < Handler.height; ++y) {
                let id = tiles[y] != null ? tiles[y][x] != null ? tiles[y][x] : -1 : -1; //IDK... it works!
                this.tiles[x][y] = this.palette.get(id);
            }
        }

        // TODO delete (testing)
        // let temp = this.palette.get(0);
        // for(let x = 0; x * tileSize < Handler.width; ++x) {
        //     this.tiles[x] = [];
        //     for(let y = 0; y * tileSize < Handler.height; ++y) {
        //         this.tiles[x][y] = temp;
        //     }
        // }
    }

    /**
     * renders this tilemap
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx) {
        let camera = Handler.world.camera;

        let xMin = Math.floor(Math.max(0, camera.xOffset / tileSize));
        let xMax = Math.floor(Math.min(Handler.width / tileSize, (camera.xOffset + Handler.canvasWidth) / tileSize + 1));
        let yMin = Math.floor(Math.max(0, camera.yOffset / tileSize));
        let yMax = Math.floor(Math.min(Handler.height / tileSize, (camera.yOffset + Handler.canvasHeight) / tileSize + 1));

        for (let y = yMin; y < yMax; ++y) {
            for (let x = xMin; x < xMax; ++x) {
                if (this.tiles[x] != null && this.tiles[x][y] != null)
                    ctx.drawImage(this.tiles[x][y].img, Math.floor(x * tileSize - camera.xOffset), Math.floor(y * tileSize - camera.yOffset), tileSize, tileSize);
            }
        }
    }
}