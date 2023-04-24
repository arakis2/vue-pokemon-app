import PokemonDb from "@/db/models/pokemonDb";
import Pokemon from "@/models/pokemon";

export default class PokemonConverter {

    static toPokemon(pokemonDb: PokemonDb): Pokemon {
        return new Pokemon(
            pokemonDb.id, 
            pokemonDb.hp, 
            pokemonDb.cp, 
            pokemonDb.name, 
            pokemonDb.picture);
    }

    static toPokemonDb(pokemon: Pokemon): PokemonDb {
        return new PokemonDb(
            pokemon.id === 0 ? undefined : pokemon.id, 
            pokemon.hp, 
            pokemon.cp, 
            pokemon.name, 
            pokemon.picture);
    }
}