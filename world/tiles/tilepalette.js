import { Tile } from "./tile.js";

export class TilePalette {
    static dev = new Tile("dev"); //TODO make air the default tile?
    constructor() {
        this.tiles = [];
    }

    load(name = "default") {
        this.tiles = [];
        fetch("./world/tiles/palettes/" + name + ".json").then((res) => { return res.json() }).then((data) => {
            for (let d of data) {
                let tile = new Tile(d.name, d.solid);
                this.tiles.push(tile);
                console.log(d.name + " loaded");
            }
        });
    }

    get size() {
        return this.tiles.length;
    }

    get(i = 0) {
        if (i > -1 && i < this.size)
            return this.tiles[i];
        return TilePalette.dev;
    }
}