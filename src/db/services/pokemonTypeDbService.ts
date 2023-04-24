import JsonDb from "../database/jsonDb";
import type PokemontypeDb from "../models/pokemonTypeDb";

export default class PokemonTypeDbService {

    static getPokemonTypes(): Promise<PokemontypeDb[]> {
        return new Promise(resolve => {
            resolve(JsonDb.getPokemonTypes());
        });
    }

    static getpokemonTypeById(id: number): Promise<PokemontypeDb|undefined> {
        return new Promise(resolve => {
            resolve(JsonDb.getpokemonTypeById(id));
        });
    }

    static getPokemonTypesByPokemonId(id: number): Promise<PokemontypeDb[]> {
        return new Promise(resolve => {
            resolve(JsonDb.getPokemonTypesByPokemonId(id));
        });
    }

    static addPokemonType(pokemonType: PokemontypeDb): Promise<PokemontypeDb|undefined> {
        return new Promise(resolve => {
            resolve(JsonDb.createPokemonType(pokemonType));
        });
    }

    static hasPokemonType(pokemonId: number, typeId: number): Promise<boolean> {
        return new Promise(resolve => {
            resolve(JsonDb.hasPokemonType(pokemonId, typeId));
        });
    }

    static updatePokemonType(pokemonType: PokemontypeDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.updatePokemonType(pokemonType));
        });
    }

    static deletePokemonType(pokemonType: PokemontypeDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.deletePokemonType(pokemonType));
        });
    }
}