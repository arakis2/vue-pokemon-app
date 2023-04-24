import JsonDb from '../database/jsonDb';
import type PokemonDb from '../models/pokemonDb';

export default class PokemonDbService {

    static getPokemons(): Promise<PokemonDb[]> {      
        return new Promise(resolve => {
            resolve(JsonDb.getPokemons());
        });
    }

    static getPokemonById(id: number): Promise<PokemonDb|undefined> {
        return new Promise(resolve => {
            resolve(JsonDb.getPokemonById(id));
        });
    }

    static isPokemonNameExists(name: string): Promise<boolean> {
        return new Promise(resolve => {
            resolve(JsonDb.isPokemonNameExists(name));
        });
    }

    static updatePokemon(pokemon:PokemonDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.updatePokemon(pokemon));
        });
    }

    static deletePokemon(pokemon:PokemonDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.deletePokemon(pokemon));
        });
    }
}