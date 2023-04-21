import type Pokemonform from '../tools/pokemon-form-property'
import type PokemonField from '../tools/pokemon-field-property';
import ValidationForm from './pokemon-validation';

const validateForm = (form: Pokemonform, isEditForm: boolean): ValidationForm => {    

  if(!isEditForm) {

    const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
    const end = ".png";

    if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
      const errorMsg: string = 'L\'url n\'est pas valide.';
      const newField: PokemonField = { value: form.picture.value, error: errorMsg, isValid: false };
      form = { ...form, ...{ picture: newField } };
    } else {
      const newField: PokemonField = { value: form.picture.value, error: '', isValid: true };
      form = { ...form, ...{ picture: newField } };
    }
  }

    // Validator name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
      const newField: PokemonField = { value: form.name.value, error: errorMsg, isValid: false };
      form = { ...form, ...{ name: newField } };
    } else {
      const newField: PokemonField = { value: form.name.value, error: '', isValid: true };
      form = { ...form, ...{ name: newField } };
    }

    // Validator hp
    if(!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
      const newField: PokemonField = {value: form.hp.value, error: errorMsg, isValid: false};
      form = { ...form, ...{ hp: newField } };
    } else {
      const newField: PokemonField = { value: form.hp.value, error: '', isValid: true };
      form = { ...form, ...{ hp: newField } };
    }

    // Validator cp
    if(!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string = 'Les dégâts du pokémon sont compris entre 0 et 99';
      const newField: PokemonField = {value: form.cp.value, error: errorMsg, isValid: false};
      form = { ...form, ...{ cp: newField } };
    } else {
      const newField: PokemonField = { value: form.cp.value, error: '', isValid: true };
      form = { ...form, ...{ cp: newField } };
    }

    return new ValidationForm(form, form.name.isValid && form.hp.isValid && form.cp.isValid);
  }

  export default validateForm;