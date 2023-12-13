export class System {
    constructor() {
        this.components = [];
    }

    process() {}

    filterDeleted() {
        this.components = this.components.filter(x => !x.isDeleted);
    }
}