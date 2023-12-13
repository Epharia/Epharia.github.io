export class Tile {
    constructor(isSolid = false) {
        this.isSolid = isSolid;
        this.img = new Image();
        this.img.src = "./assets/tiles/wall.png";
    }
}