import JsonDb from "../database/jsonDb";
import type PokemontypeDb from "../models/pokemonTypeDb";
import DbService from "./dbService";

export default class PokemonTypeDbService extends DbService {

    static getPokemonTypes(): Promise<PokemontypeDb[]> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getPokemonTypes());
            });
        }       
    }

    static getpokemonTypeById(id: number): Promise<PokemontypeDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes/${id}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getpokemonTypeById(id));
            });
        }      
    }

    static getPokemonTypesByPokemonId(id: number): Promise<PokemontypeDb[]> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes?pokemonid=${id}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getPokemonTypesByPokemonId(id));
            });
        }      
    }

    static addPokemonType(pokemonType: PokemontypeDb): Promise<PokemontypeDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes`, {
                method: 'POST',
                body: JSON.stringify(pokemonType),
                headers: { 'Content-Type': 'application/json'} 
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.createPokemonType(pokemonType));
            });
        }      
    }

    static hasPokemonType(pokemonId: number, typeId: number): Promise<boolean|void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes?pokemonid:${pokemonId}&typeid:${typeId}`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.hasPokemonType(pokemonId, typeId));
            });
        }        
    }

    static updatePokemonType(pokemonType: PokemontypeDb): Promise<void> {
        console.log(pokemonType);
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes/${pokemonType.id}`, {
                method: 'PUT',
                body: JSON.stringify(pokemonType),
                headers: { 'Content-Type': 'application/json'} 
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
            } else {
                return new Promise(resolve => {
                resolve(JsonDb.updatePokemonType(pokemonType));
            });
        }
    }

    static deletePokemonType(pokemonType: PokemontypeDb): Promise<void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/pokemontypes/${pokemonType.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'} 
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.deletePokemonType(pokemonType));
            });
        }
    }
}