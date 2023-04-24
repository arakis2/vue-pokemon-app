export default class TypeDb {

    id: number|undefined;
    name: string;
    created?: Date;

    constructor(name: string = '', created:Date = new Date){
        this.name = name;
        this.created = created;
    }
}