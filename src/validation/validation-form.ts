import type PokemonForm from "../tools/form-form-property";

export default class ValidationForm{
    form: PokemonForm;
    isValid: boolean | undefined

    constructor(form: PokemonForm, isValid: boolean | undefined){
        this.form = form;
        this.isValid = isValid
    }
}