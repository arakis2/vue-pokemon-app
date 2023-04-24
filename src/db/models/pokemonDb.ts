export default class PokemonDb {

    id: number|undefined
    hp: number;
    cp: number;
    name: string;
    picture: string;
    created?: Date;
     
    constructor(
        id: number|undefined = undefined,
        hp: number = 100,
        cp: number = 10,
        name: string = '...',
        picture: string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
        created: Date = new Date()
    ) {
        this.id = id;
        this.hp = hp;
        this.cp = cp;
        this.name = name;
        this.picture = picture;
        this.created = created;
    }
   }