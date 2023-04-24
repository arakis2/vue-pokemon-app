import JsonDb from "../database/jsonDb";
import type TypeDb from "../models/typeDb";

export default class TypeDbService {
    
    static getTypes(): Promise<TypeDb[]> {
        return new Promise(resolve => {
            resolve(JsonDb.getTypes());
        });
    }

    static getTypeById(id: number): Promise<TypeDb|undefined> {
        return new Promise(resolve => {
            resolve(JsonDb.getTypeById(id));
        });
    }

    static getTypeByName(name: string): Promise<TypeDb|undefined> {
        return new Promise(resolve => {
            resolve(JsonDb.getTypeByName(name));
        });
    }

    static isTypeNameExists(name: string): Promise<boolean> {
        return new Promise(resolve => {
            resolve(JsonDb.isTypeNameExists(name));
        });
    }

    static addType(type: TypeDb): TypeDb|undefined {
        return JsonDb.createType(type);
    }

    static updateType(type: TypeDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.updateType(type));
        });
    }

    static deleteType(type: TypeDb): Promise<void> {
        return new Promise(resolve => {
            resolve(JsonDb.deleteType(type));
        });
    }
}