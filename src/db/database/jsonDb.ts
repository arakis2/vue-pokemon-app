import PokemonDb from "../models/pokemonDb";
import {pokemons, types, pokemontypes} from '@/db/json/localdatabase.json'
import TypeDb from "../models/typeDb";
import PokemontypeDb from "../models/pokemonTypeDb";

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

    static searchPokemonByName(term: string): PokemonDb[] {
        return this.getPOKEMONS().filter(p => p.name.toUpperCase().includes(term))
    }

    private static getPOKEMONS(): PokemonDb[]{
        if (!this.POKEMONS || this.POKEMONS.length < 1) {
            this.POKEMONS = [];
            pokemons.forEach(item => {
                this.POKEMONS?.push( new PokemonDb(
                    item.id,
                    item.hp, 
                    item.cp,
                    item.name,
                    item.picture
                ))
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
        return this.getTYPES().find(type => type.id === id);
    }

    static getTypeByName(name: string): TypeDb|undefined{
        return this.getTYPES().find(type => type.name.toUpperCase().trim() === name.toUpperCase().trim());
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
        if(!this.TYPES || this.TYPES.length < 1) {
            this.TYPES = [];
            types.forEach(type => {
                this.TYPES?.push(new TypeDb(type.id, type.name ))
            });
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
        return this.getPOKEMONTYPES().filter(pokemontype => pokemontype.pokemonid === id);
    }

    static createPokemonType(pokemonType: PokemontypeDb): PokemontypeDb|undefined {
        pokemonType.id = this.generateId(Table.PokemonType);
        delete pokemonType.created;

        this.getPokemonTypes().push(pokemonType);

        return this.getpokemonTypeById(pokemonType.id);
    }

    static hasPokemonType(pokemonId: number, typeId: number): boolean {
        return this.getPokemonTypes().some(pokemontype => pokemontype.pokemonid === pokemonId && pokemontype.typeid === typeId)
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
        if(!this.POKEMONTYPES || this.POKEMONTYPES.length < 1) {
            this.POKEMONTYPES = [];
            pokemontypes.forEach(pokemonType => {
                this.POKEMONTYPES?.push(new PokemontypeDb(pokemonType.id, pokemonType.pokemonid, pokemonType.typeid))
            });
        }

        return this.POKEMONTYPES ?? [];
    }

    private static setPOKEMONTYPES(pokemonsTypes: PokemontypeDb[]): void {
        this.POKEMONTYPES = pokemonsTypes;
    }


}