import JsonDb from '../database/jsonDb';
import type PokemonDb from '../models/pokemonDb';
import DbService from './dbService';

export default class PokemonDbService extends DbService {

    static getPokemons(): Promise<PokemonDb[]> { 
        if (!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {   
                resolve(JsonDb.getPokemons());
            });
        }
    }

    static getPokemonById(id: number): Promise<PokemonDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons/${id}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getPokemonById(id));
            });
        }      
    }

    static isPokemonNameExists(name: string): Promise<boolean|void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons?q=${name}`)
            .then(response => response.json())
            .then(data => !this.isEmpty(data))
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.isPokemonNameExists(name));
            });
        }
        
    }

    static createPokemon(pokemon: PokemonDb): Promise<PokemonDb|undefined> {
        delete pokemon.created;
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons`, {
                method: 'POST',
                body: JSON.stringify(pokemon),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.createPokemon(pokemon));
            });
        }     
    }

    static updatePokemon(pokemon:PokemonDb): Promise<void> {
        delete pokemon.created;
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons/${pokemon.id}`, {
                method: 'PUT',
                body: JSON.stringify(pokemon),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.updatePokemon(pokemon));
            });
        }  
    }

    static deletePokemon(pokemon:PokemonDb): Promise<void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons/${pokemon.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.deletePokemon(pokemon));
            });
        }      
    }

    static searchPokemon(term: string): Promise<PokemonDb[]> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemons?q=${name}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                    resolve(JsonDb.searchPokemonByName(term));
                });
        }
    }

}