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
                    this.loadPokemons(pokemonsDb).then(pokemonList => {
                        resolve(pokemonList);                      
                    });                                                         
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
                PokemonDbService.updatePokemon(pokemonDb).then(() => {
                    PokemonTypeDbService.getPokemonTypesByPokemonId(pokemon.id).then(dbtypes => {
                        
                        const pokemonTypes = dbtypes.map(l => l.typeid).filter(n => n !== undefined && n > 0);
                        
                        this.getTypesDbByTypeName(pokemon.types).then(typesDb => {
                            const types: number[] = [];
                            typesDb.forEach(item => {
                                if(item.id !== undefined && item.id > 0){
                                    
                                    types.push(item.id);
                                }
                            })

                                if(types && types.length > 0){
                                    if (types.toString() !== pokemonTypes.toString()){
            
                                        if (pokemonTypes.length > types.length) {
                                            //supression
                                            pokemonTypes.forEach(i => {
                                                if (!types.includes(i)) {
                                                    const item = dbtypes.find(item => item.typeid === i);
                                                    if (item){
                                                        PokemonTypeDbService.deletePokemonType(item).then(() => {
                                                            this.getPokemon(pokemon.id).then(pokemon => {
                                                                if(pokemon){
                                                                    resolve(pokemon);
                                                                }                                                                  
                                                            })
                                                        });
                                                    }
                                                    
                                                }
                                            });
                                        } else {
                                            // Ajout
                                            types.forEach(i => {
                                                if (i  && i > 0 && !pokemonTypes.includes(i)) {
                                                    const type = new PokemontypeDb(undefined, pokemon.id, i);
                                                    
                                                    PokemonTypeDbService.addPokemonType(type).then(() => {
                                                        this.getPokemon(pokemon.id).then(pokemon => {
                                                            if(pokemon){
                                                                resolve(pokemon);
                                                            }                                                                  
                                                        })
                                                    });
                                                }
                                            })
                                        }                                        
                                    }

                                    this.getPokemon(pokemon.id).then(pokemon => {
                                        if(pokemon){
                                            resolve(pokemon);
                                        }                                                                  
                                    })
                                }   
                            }   
                        )   
                    })                   
                });          
        });  
    }

    static deletePokemon(pokemon: Pokemon): Promise<{}> {
        return new Promise(resolve => {    
            PokemonTypeDbService.getPokemonTypesByPokemonId(pokemon.id).then(types => {
                types.forEach(type => {
                    PokemonTypeDbService.deletePokemonType(type).then(() => {
                        if(types.indexOf(type) === types.length - 1) {
                            const pokemonDb = PokemonConverter.toPokemonDb(pokemon);
                            PokemonDbService.deletePokemon(pokemonDb).then(() => {
                                resolve({});
                            });            
                        }
                    });
                });

            
            });            
          }); 
    }

    static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
        delete pokemon.created
        return new Promise(resolve => {    
            const pokemonDb = PokemonConverter.toPokemonDb(pokemon);
            PokemonDbService.createPokemon(pokemonDb).then(pokemonDb => {
                if (pokemonDb?.id) {
                    this.getTypesDbByTypeName(pokemon.types).then(types => {
                        types.forEach(type => {
                            const pokemontype = new PokemontypeDb(undefined, pokemonDb?.id, type.id);
                            PokemonTypeDbService.addPokemonType(pokemontype).then(() => {
                                if(types.indexOf(type) === types.length - 1) {
                                    this.loadPokemon(pokemonDb).then(newPokemon => {
                                        if(newPokemon) {
                                            resolve(newPokemon);
                                        }                                       
                                    });                                   
                                }
                            });
                        });                  
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
                    
                    if(pokemonsDb.indexOf(pokemonDb) === pokemonsDb.length - 1){
                        resolve(pokemons);
                    }
                })
                
            });
        })
    }

    private static loadPokemons(pokemonsDb: PokemonDb[]): Promise<Pokemon[]> {
        return new Promise(resolve => {
            const pokemons: Pokemon[] = [];
            pokemonsDb.forEach(pokemonDb => {
                this.loadPokemon(pokemonDb).then(pokemon => {
                    pokemons.push(pokemon);

                    if(pokemonsDb.length === pokemons.length){
                        resolve(pokemons);
                    }
                })
                
            });
            
        });
    }

    private static loadPokemon(pokemonDb: PokemonDb): Promise<Pokemon> {
       return new Promise(resolve => {
        
        PokemonTypeDbService.getPokemonTypesByPokemonId(pokemonDb.id ?? 0).then(typesDb => {             
            const pokemon = PokemonConverter.toPokemon(pokemonDb);         
            pokemon.types = [];
            typesDb.forEach(type => {           
                TypeDbService.getTypeById(type.typeid ?? 0).then(typeDb => {
                    if(typeDb){                                   
                        pokemon.types.push(typeDb.name);
                        pokemon.types = pokemon.types.sort();
                    }
                    
                    if(pokemon.types.length === typesDb.length){
                        resolve(pokemon);
                    }
                })
            })
           
        });
       })
    }

    private static  getTypesDbByTypeName(types: string[]): Promise<TypeDb[]>{
        return new Promise(resolve => {
            const typesDb: TypeDb[] = [];
            types.forEach(type => {
               this.getTypeDbByName(type).then(typeDb => {
                if(typeDb) {
                    typesDb.push(typeDb);
                }
                if(types.indexOf(type) === types.length - 1){
                    resolve(typesDb);
                   }               
               })             
            })                      
        })
    }
    
    private static getTypeDbByName(name: string): Promise<TypeDb|undefined> {
        return new Promise(resolve => {
            TypeDbService.getTypeByName(name).then(typeBb => {
                resolve(typeBb);
            });
        });
    }
}