import type PokemonForm from "../tools/pokemon-form-property";

export default class PokemonValidation{
    form: PokemonForm;
    isValid: boolean | undefined

    constructor(form: PokemonForm, isValid: boolean | undefined){
        this.form = form;
        this.isValid = isValid
    }
}