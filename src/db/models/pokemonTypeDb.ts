export default class PokemontypeDb {
    id: number|undefined;
    pokemonId: number;
    typeId: number;
    created?: Date;

    constructor(id: number|undefined, pokemonId: number = 0, typeId: number = 0, created: Date = new Date()) {
        this.id = id;
        this.pokemonId = pokemonId;
        this.typeId = typeId;
        this.created = created;
    }
}