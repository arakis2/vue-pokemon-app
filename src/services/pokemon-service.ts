import POKEMONS from "@/models/mock-pokemon";
import type Pokemon from "@/models/pokemon";
import PokemonDbService from "@/db/services/pokemonDbService";
import PokemonTypeDbService from "@/db/services/pokemonTypeDbService";
import TypeDbService from "@/db/services/typeDbService";
import PokemonConverter from '@/tools/converters/pokemon-converter'
import type PokemonDb from "@/db/models/pokemonDb";
import PokemontypeDb from "@/db/models/pokemonTypeDb";
import type TypeDb from "@/db/models/typeDb";

export default class PokemonService {
    static pokemons: Pokemon[] = POKEMONS

    static getPokemons(): Promise<Pokemon[]> {
        return new Promise(resolve => {               
                PokemonDbService.getPokemons().then(pokemonsDb => {
                    const pokemons: Pokemon[] = [];
                    pokemonsDb.forEach(pokemonDb => {
                        this.loadPokemon(pokemonDb).then(pokemon => {
                            pokemons.push(pokemon);
                        })
                    });
                    resolve(pokemons);
                });
        })      
    }

    static getPokemon(id: number): Promise<Pokemon|null|undefined> {
        return new Promise(resolve => {
            PokemonDbService.getPokemonById(id).then(pokemondb => {
                if(pokemondb) {
                    const pokemon = this.loadPokemon(pokemondb);
                    resolve(pokemon);
                }                
            })
        });
    }

    static async updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
        return await new Promise(resolve => {
            const pokemonDb = PokemonConverter.toPokemonDb(pokemon);

            PokemonDbService.updatePokemon(pokemonDb);

            PokemonTypeDbService.getPokemonTypesByPokemonId(pokemon.id).then(dbtypes => {
                const pokemonTypes = dbtypes.map(l => l.typeId).filter(n => n !== undefined && n > 0);
                this.getTypesDbByTypeName(pokemon.types).then(typesDb => {
                        const types = typesDb.map(t => t.id);

                        if (types.toString() !== pokemonTypes.toString()){

                            if (pokemonTypes.length > types.length) {
                                //supression
                                pokemonTypes.forEach(i => {
                                    if (!types.includes(i)) {
                                        const item = dbtypes.find(item => item.typeId === i);
                                        if (item){
                                            PokemonTypeDbService.deletePokemonType(item);
                                        }
                                        
                                    }
                                });
                            } else {
                                console.log('dans ajout')
                                // Ajout
                                types.forEach(i => {
                                    if (i  && i > 0 && !pokemonTypes.includes(i)) {
                                        const type = new PokemontypeDb(undefined, pokemon.id, i);
                                        PokemonTypeDbService.addPokemonType(type);
                                    }
                                })
                            }
                        }
                    }
                    
                )
            })

            PokemonDbService.getPokemonById(pokemon.id).then(pokemondb => {
                if(pokemondb) {
                    const pokemon = this.loadPokemon(pokemondb);
                    resolve(pokemon);
                }                
            })
        }); 
    }

    static deletePokemon(pokemon: Pokemon): Promise<{}> {
        return new Promise(resolve => {    
            PokemonTypeDbService.getPokemonTypesByPokemonId(pokemon.id).then(types => {
                types.forEach(type => {
                    PokemonTypeDbService.deletePokemonType(type);
                });

            const pokemonDb = PokemonConverter.toPokemonDb(pokemon);
            PokemonDbService.deletePokemon(pokemonDb);
            resolve({});
            });            
          }); 
    }

    static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
        return new Promise(resolve => {    
            const pokemonDb = PokemonConverter.toPokemonDb(pokemon);
            PokemonDbService.createPokemon(pokemonDb).then(pokemonDb => {
                if (pokemonDb?.id) {
                    this.getTypesDbByTypeName(pokemon.types).then(types => {
                        types.forEach(type => {
                            const pokemontype = new PokemontypeDb(undefined, pokemonDb?.id, type.id);
                            PokemonTypeDbService.addPokemonType(pokemontype);
                        });
                        const newPokemon = this.loadPokemon(pokemonDb);
                        resolve(newPokemon);
                    });
                }              
            });
          });
    }

    static  searchPokemon(term: string): Promise<Pokemon[]> {
        return new Promise(resolve => {
            PokemonDbService.searchPokemon(term).then(pokemonsDb => {
                const pokemons: Pokemon[] = [];
                pokemonsDb.forEach(pokemonDb => {
                    this.loadPokemon(pokemonDb).then(pokemon => {
                        pokemons.push(pokemon);
                        }
                    );                    
                })
                resolve(pokemons);
            });
        })
    }

    private static loadPokemon(pokemonDb: PokemonDb): Promise<Pokemon> {
       return new Promise(resolve => {
        
        PokemonTypeDbService.getPokemonTypesByPokemonId(pokemonDb.id ?? 0).then(typesDb => { 
            const pokemon = PokemonConverter.toPokemon(pokemonDb);         
            pokemon.types = [];
            typesDb.forEach(type => {
                TypeDbService.getTypeById(type.typeId ?? 0).then(typename => {
                    if(typename){                                   
                        pokemon.types.push(typename.name);
                        pokemon.types = pokemon.types.sort();
                    }                                
                })
            })
           resolve(pokemon);
        });
       })
    }

    private static  getTypesDbByTypeName(types: string[]): Promise<TypeDb[]>{
        return new Promise(resolve => {
            const typesDb: TypeDb[] = [];
            types.forEach(type => {
                TypeDbService.getTypeByName(type).then(type => {
                        if(type) {
                            typesDb.push(type)
                        }               
                    });
            })
            resolve(typesDb);
        })
    }

    
}