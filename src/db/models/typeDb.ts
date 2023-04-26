export default class TypeDb {

    id: number|undefined;
    name: string;
    created?: Date;

    constructor(id: number|undefined = undefined, name: string = '', created:Date = new Date){
        this.id = id;
        this.name = name;
        this.created = created;
    }
}