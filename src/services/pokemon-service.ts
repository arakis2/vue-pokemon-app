import POKEMONS from "@/models/mock-pokemon";
import type Pokemon from "@/models/pokemon";
import PokemonDbService from "@/db/services/pokemonDbService";
import PokemonTypeDbService from "@/db/services/pokemonTypeDbService";
import TypeDbService from "@/db/services/typeDbService";
import PokemonConverter from '@/tools/converters/pokemon-converter'

export default class PokemonService {
    static pokemons: Pokemon[] = POKEMONS

    static getPokemons(): Promise<Pokemon[]> {
        return new Promise(resolve => {
            const results: Pokemon[] = [];

            PokemonDbService.getPokemons().then(pokemons => {
                console.log(pokemons);
                pokemons.forEach(pokemonDb => {
                    const pokemon = PokemonConverter.toPokemon(pokemonDb);
                    PokemonTypeDbService.getPokemonTypesByPokemonId(pokemon.id ?? 0).then(types => {
                        types.forEach(type => {
                            TypeDbService.getTypeById(type.id ?? 0).then(typename => {
                                if(typename){
                                    pokemon.types.push(typename.name);
                                    pokemon.types = pokemon.types.sort();
                                }                                
                            })
                        })
                    });
                    results.push(pokemon);                   
                });
            });
            console.log(results);
            resolve(results);
        });
    }

    static getPokemon(id: number): Promise<Pokemon|null|undefined> {
        return new Promise(resolve => {
            resolve(this.pokemons.find(pokemon => id === pokemon.id))
        });
    }

    static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
        return new Promise(resolve => {
            const { id } = pokemon;
            const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
            this.pokemons[index] = pokemon;
            resolve(pokemon);
        }); 
    }

    static deletePokemon(pokemon: Pokemon): Promise<{}> {
        return new Promise(resolve => {    
            const { id } = pokemon;
            this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
            resolve({});
          }); 
    }

    static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
        return new Promise(resolve => {    
            this.pokemons.push(pokemon);
            resolve(pokemon);
          });
    }

    static  searchPokemon(term: string): Promise<Pokemon[]> {
        return new Promise(resolve => {
            const results = this.pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(term.toUpperCase()));
            resolve(results);
        })
    }

    
}