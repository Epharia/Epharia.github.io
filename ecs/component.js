import { idGenerator } from "../util/idGenerator.js";

const idGen = new idGenerator();

export class Component {
    constructor() {
        this.id = idGen.id;
        this.deleted = false;
    }

    delete() {
        this.deleted = true;
    }
}