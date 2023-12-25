export class EntityManager {
    constructor() {
        this.pools = [];
        this.systems = [];
    }

    tick() {

    }

    /* TODO before replacing the old entitymanager
    ENTITY:
    -Assign components/tags
    -Remove components/tags

    COMPONENT:
    -Type? constructor.name?
    -id?

    SYSTEM:
    -track components used by the system (QUERY?)


    ---------------- FUTURE ME PROBLEMS ----------------
    Pools
    Query...? maybe?
    Blueprints? external? -> JSON?
    special behaviour? (f.e. boss/player) -> Script?

    Relations CompPair -> (Tag/Comp A, Tag/Comp B)
    */
}