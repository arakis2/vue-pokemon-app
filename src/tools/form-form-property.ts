import type PokemonField from "./form-field-property";

type PokemonForm = {
    picture: PokemonField,
    name: PokemonField,
    hp: PokemonField,
    cp: PokemonField,
    types: PokemonField
}

export default PokemonForm;