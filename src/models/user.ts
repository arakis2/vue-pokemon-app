export default class User {
    id: number;
    username: string;
    password: string;
    created?: Date;
    updated?: Date;

    constructor(id: number, username: string, password: string, created: Date = new Date(), updated: Date|undefined = undefined){
        this.id = id;
        this.username = username;
        this.password = password;
        this.created = created;
        this.updated = updated;
    }
}