import { Sprite } from "../sprite.js";

const MAX_OBJECTS = 5;
const MAX_LEVELS = 5;

export class CollisionHandler {
    constructor() {
        this.q = new QuadTree(0, new Bound(0, 0, 1920, 1080));
    }

    process(manager) {
        let entities = manager.list;

        if(entities.length == 0) return;

        this.q.clear();
        let objects = [];
        for(let entity of entities) {
            if(!(entity instanceof Sprite)) continue;
            let e = new Entry(entity);
            objects.push(e);
            this.q.insert(e);
        }

        let returnObjects = [];
        for(let cur of objects) {
            returnObjects.clear;
            this.q.retrieve(returnObjects, cur);

            for(let i = 0; i < returnObjects.length; ++i) {
                let target = returnObjects[i];
                if(cur == target) continue;

                cur.s.checkCollision(target.s);
            }
        }
    }
}

class Entry {
    constructor(sprite) {
        this.s = sprite;
        this.aabb = sprite.aabb;
        this.p = sprite.pos.copy;
    }
}

class Bound {
    constructor(x, y, width, height) {
        this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
    }
}

class QuadTree {
    constructor(level, bounds) {
        this.level = level;
        this.objects = [];
        this.bounds = bounds;
        this.nodes = [null,null,null,null]; //TODO remove null
    }

    clear() {
        this.objects.clear;

        for(let i = 0; i < this.nodes.length; ++i) {
            if(this.nodes[i] != null) {
                this.nodes[i].clear();
                this.nodes[i] = null;
            }
        }
    }

    split() {
        let subWidth = this.bounds.width / 2,
        subHeight = this.bounds.height / 2,
        x = this.bounds.x,
        y = this.bounds.y;

        //Quadrants I-IV
        this.nodes[0] = new QuadTree(this.level + 1, new Bound(x + subWidth, y, subWidth, subHeight));
        this.nodes[1] = new QuadTree(this.level + 1, new Bound(x, y, subWidth, subHeight));
        this.nodes[2] = new QuadTree(this.level + 1, new Bound(x, y + subHeight, subWidth, subHeight));
        this.nodes[0] = new QuadTree(this.level + 1, new Bound(x + subWidth, y + subHeight, subWidth, subHeight));
    }

    getIndex(entry) {
        // console.log(entry);
        let index = -1;
        let vertMid = this.bounds.x + (this.bounds.w / 2);
        let horiMid = this.bounds.y + (this.bounds.h / 2);

        let topQuads = (entry.p.y - entry.aabb.h/2 < horiMid && entry.p.y + entry.aabb.h/2 < horiMid);
        let botQuads = (entry.p.y - entry.aabb.h/2 > horiMid);

        if(entry.p.x - entry.aabb.w/2 < vertMid && entry.p.x + entry.aabb.w/2 < vertMid) {
            if(topQuads) {
                index = 1;
            } else if(botQuads) {
                index = 2;
            }
        } else if(entry.p.x - entry.aabb.w/2 > vertMid) {
            if(topQuads) {
                index = 0;
            } else if(botQuads) {
                index = 3;
            }
        }

        return index;
    }

    insert(entry) {
        if(this.nodes[0] != null) {
            let index = this.getIndex(entry);

            if(index != -1) {
                this.nodes[index].insert(entry);
                return;
            }
        }

        this.objects.push(entry);

        if(this.objects.length > MAX_OBJECTS && this.level < MAX_LEVELS) {
            if(this.nodes[0] == null) {
                this.split();
            }

            let i = 0;
            while(i < this.objects.length) {
                let index = this.getIndex(this.objects[i]);
                if(index != -1) {
                    this.nodes[index].insert(this.objects.splice(i, 1)[0]);
                } else {
                    ++i;
                }
            }
        }
    }

    retrieve (returnObjects, entry) {
        let index = this.getIndex(entry);
        if(index != -1 && this.nodes[0] != null) {
            this.nodes[index].retrieve(returnObjects, entry);
        }

        returnObjects.push(...this.objects);
        return returnObjects;
    }
}