export class Tile {
    constructor(texture = "dev", isSolid = false) {
        this.isSolid = isSolid;
        this.img = new Image();
        this.img.src = "./assets/tiles/" + texture + ".png";
    }
}