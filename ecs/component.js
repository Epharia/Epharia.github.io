import { idGenerator } from "../util/idGenerator.js";

const idGen = new idGenerator();

export class Component {
    constructor(entity) {
        this.id = idGen.id;
        this.entity = entity;
        this.deleted = false;
    }

    delete() {
        this.deleted = true;
    }

    get type() {
        this.constructor.name;
    }
}