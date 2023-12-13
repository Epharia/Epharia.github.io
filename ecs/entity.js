import { idGenerator } from "../util/idGenerator.js";

const idGen = new idGenerator();

export class Entity {
    constructor() {
        this.id = idGen.id;
        this.components = [];
    }

    assign(...components) {
        this.components.push(...components);
    }

    remove(components) { //TODO

    }

    clear() { //TODO
        
    }
}