export default class PokemontypeDb {
    id: number|undefined;
    pokemonid: number;
    typeid: number;
    created?: Date;

    constructor(id: number|undefined, pokemonId: number = 0, typeId: number = 0, created: Date = new Date()) {
        this.id = id;
        this.pokemonid = pokemonId;
        this.typeid = typeId;
        this.created = created;
    }
}