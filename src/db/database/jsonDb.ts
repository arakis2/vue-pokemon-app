import PokemonDb from "../models/pokemonDb";
import pokemons from '@/db/json/pokemon.json'
import TypeDb from "../models/typeDb";
import types from '@/db/json/type.json'
import PokemontypeDb from "../models/pokemonTypeDb";
import pokemonTypes from '@/db/json/pokemon-type.json'

enum Table {
    Pokemon,
    Type,
    PokemonType
}

export default class JsonDb {
    private static POKEMONS: PokemonDb[]|undefined;
    private static TYPES: TypeDb[]|undefined;
    private static POKEMONTYPES: PokemontypeDb[]|undefined;

    

    private static generateId(table: Table): number {
        switch(table) {
            case Table.Pokemon: {
                const ids = this.getPOKEMONS().map(pokemon => {
                    return typeof(pokemon.id) === 'number' ? pokemon.id : 0;
                });
                if (!ids) {
                    return 0;
                }
                return Math.max(...ids) + 1;
            }
            case Table.Type: {
                const ids = this.getTYPES().map(type => {
                    return typeof(type.id) === 'number' ? type.id : 0;

                });
                if (!ids) {
                    return 0;
                }
                return Math.max(...ids) + 1;
            }
            default: {
                const ids = this.getPOKEMONTYPES().map(pokemonTypes => {
                    return typeof(pokemonTypes.id) === 'number' ? pokemonTypes.id : 0;

                });
                if (!ids) {
                    return 0;
                }
                return Math.max(...ids) + 1;
            }
               
        }
    }

    // Pokémons
    static getPokemons(): PokemonDb[] {
        console.log(this.getPOKEMONS());
        return this.getPOKEMONS();
    }

    static getPokemonById(id:number): PokemonDb|undefined {
        return this.getPOKEMONS().find(pokemon => pokemon.id === id);
    }

    static isPokemonNameExists(name: string): boolean {
        return this.getPOKEMONS().some(pokemon => pokemon.name.toUpperCase().trim() === name.toUpperCase().trim());
    }

    static updatePokemon(pokemon: PokemonDb): void{
        const {id} = pokemon;
        const index = this.getPOKEMONS().findIndex(pokemon => pokemon.id === id);
        this.getPOKEMONS()[index] = pokemon;
    }

    static deletePokemon(pokemon: PokemonDb): void {
        const { id } = pokemon;
        this.setPOKEMONS(this.getPOKEMONS().filter(pokemon => pokemon.id !== id));
    }

    static createPokemon(pokemon: PokemonDb): PokemonDb|undefined {
        pokemon.id = this.generateId(Table.Pokemon);
        delete pokemon.created;

        this.getPOKEMONS().push(pokemon);

        return this.getPokemonById(pokemon.id);
    }

    private static getPOKEMONS(): PokemonDb[]{
        if (!this.POKEMONS || this.POKEMONS.length < 1) {
            pokemons.forEach(item => {
                console.log(item);
                this.POKEMONS?.push( Object.assign(new PokemonDb, item))
            });
        }       
       
        return this.POKEMONS ?? [];
    }

    private static setPOKEMONS(pokemons: PokemonDb[]){
        this.POKEMONS = pokemons;
    }

    // Types
    static getTypes(): TypeDb[] {
        return this.getTYPES();
    }

    static getTypeById(id: number): TypeDb|undefined{
        return this.getTYPES().find(pokemon => pokemon.id === id);
    }

    static getTypeByName(name: string): TypeDb|undefined{
        return this.getTYPES().find(pokemon => pokemon.name.toUpperCase().trim() === name.toUpperCase().trim());
    }

    static isTypeNameExists(name: string): boolean {
        return this.getTYPES().some(type => type.name.toUpperCase().trim() === name.toUpperCase().trim());
    }

    static createType(type: TypeDb): TypeDb|undefined {
        type.id = this.generateId(Table.Type);
        delete type.created;
        this.getTYPES().push(type);
        return this.getTypeById(type.id);
    }

    static updateType(type: TypeDb): void {
        const {id} = type;
        const index = this.getTYPES().findIndex(type => type.id === id);
        this.getTYPES()[index] = type;
    }

    static deleteType(type: TypeDb): void {
        const {id} = type;
        this.setTYPES(this.getTYPES().filter(type => type.id !== id));

    }

    private static getTYPES(): TypeDb[]{
        if(!this.TYPES) {

            if (Array.isArray(types)){
                this.TYPES = Object.assign(new TypeDb, types);
            }
        }

        return this.TYPES ?? [];
    }

    private static setTYPES(types: TypeDb[]){
        this.TYPES = types;
    }

    // Pokemon-types
    static getPokemonTypes(): PokemontypeDb[]{
        return this.getPOKEMONTYPES();
    }

    static getpokemonTypeById(id: number): PokemontypeDb|undefined {
        return this.getPOKEMONTYPES().find(pokemontype => pokemontype.id === id)
    }

    static getPokemonTypesByPokemonId(id: number): PokemontypeDb[] {
        return this.getPOKEMONTYPES().filter(pokemontype => pokemontype.pokemonId === id);
    }

    static createPokemonType(pokemonType: PokemontypeDb): PokemontypeDb|undefined {
        pokemonType.id = this.generateId(Table.PokemonType);
        delete pokemonType.created;

        this.getPokemonTypes().push(pokemonType);

        return this.getpokemonTypeById(pokemonType.id);
    }

    static hasPokemonType(pokemonId: number, typeId: number): boolean {
        return this.getPokemonTypes().some(pokemontype => pokemontype.pokemonId === pokemonId && pokemontype.typeId === typeId)
    }

    static updatePokemonType(pokemonType: PokemontypeDb): void {
        const {id} = pokemonType;
        const index = this.getPOKEMONTYPES().findIndex(pokemontype => pokemontype.id === id);
        this.getPOKEMONTYPES()[index] = pokemonType;
    }

    static deletePokemonType(pokemonType: PokemontypeDb): void {
        const {id} = pokemonType;
        this.setPOKEMONTYPES(this.getPOKEMONTYPES().filter(pokemontypes => pokemontypes.id !== id))
    }

    private static getPOKEMONTYPES(): PokemontypeDb[] {
        if(this.POKEMONTYPES) {

            if (Array.isArray(pokemonTypes)){
                this.POKEMONTYPES = Object.assign(new PokemontypeDb, pokemonTypes);
            }
        }

        return this.POKEMONTYPES ?? [];
    }

    private static setPOKEMONTYPES(pokemonsTypes: PokemontypeDb[]): void {
        this.POKEMONTYPES = pokemonsTypes;
    }


}