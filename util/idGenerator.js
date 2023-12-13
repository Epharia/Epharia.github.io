export class idGenerator {
    constructor() {
        this.freeIDs = [];
        this.nextID = 0;
    }

    get gen() {
        if(this.freeIDs.length == 0) {
            return this.nextID++;
        }
        return this.freeIDs.pop();
    }
}