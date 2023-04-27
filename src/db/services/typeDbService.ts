import JsonDb from "../database/jsonDb";
import type TypeDb from "../models/typeDb";
import DbService from "./dbService";

export default class TypeDbService extends DbService {
    
    static getTypes(): Promise<TypeDb[]> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types`)
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getTypes());
            });
        }      
    }

    static getTypeById(id: number): Promise<TypeDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types/${id}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error));
        } else {
        return new Promise(resolve => {
            resolve(JsonDb.getTypeById(id));
        });
        }
    }

    static getTypeByName(name: string): Promise<TypeDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types?q=${name}`)
            .then(response => response.json())
            .then(data => this.isEmpty(data) ? null : data[0])
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.getTypeByName(name));
            });
        }
    }

    static isTypeNameExists(name: string): Promise<boolean|void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types?q=${name}`)
            .then(response => response.json())
            .then(data => !this.isEmpty(data))
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.isTypeNameExists(name));
            });
        }
    }

    static addType(type: TypeDb): Promise<TypeDb|undefined> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types`, {
                method: 'POST',
                body: JSON.stringify(type),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.createType(type));
            });
        }      
    }

    static updateType(type: TypeDb): Promise<void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types/${type.id}`, {
                method: 'PUT',
                body: JSON.stringify(type),
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.updateType(type));
            });
        }
    }

    static deleteType(type: TypeDb): Promise<void> {
        if(!this.isLocal){
            return fetch(`${this.baseUrl}/types/${type.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })
            .then(response => response.json())
            .catch(error => this.handleError(error));
        } else {
            return new Promise(resolve => {
                resolve(JsonDb.deleteType(type));
            });
        }
    }
}