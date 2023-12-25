import { idGenerator } from "../util/idGenerator.js";

const idGen = new idGenerator();

export class Entity {
    constructor() {
        this.id = idGen.id;
        this.tags = []; //TODO future me problem
        this.components = [];
        this.isDead = false;
    }

    assign(...components) {
        this.components.push(...components);
    }

    remove(type) { //TODO

    }

    clear() { //TODO
        
    }
}