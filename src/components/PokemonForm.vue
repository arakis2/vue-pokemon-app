<script lang="ts">

export default {
    props: {
        Pokemon: {
            type: Object as PropType<Pokemon>,
            required: true
        },
        IsEditForm: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            pokemon: this.Pokemon,
            isEditForm: this.IsEditForm,
            form: undefined as PokemonForm | undefined | null,
            validateForm: validateForm,
            types: [] as string[],
            isTypesValid: isTypesValid,
            formatType: formatType,
            urls: [] as string[]
        };
    },
    methods: {
        hasType(type: string): boolean {
            return this.pokemon.types.includes(type);
        },
        initform(): void {
            this.setform({
                picture: { value: this.pokemon.picture },
                name: { value: this.pokemon.name, isValid: true },
                hp: { value: this.pokemon.hp, isValid: true },
                cp: { value: this.pokemon.cp, isValid: true },
                types: { value: this.pokemon.types, isValid: true }
            } as Pokemonform);

            PokemonService.getImageUrls().then(imgs => {
                this.urls = imgs;                
            });  
        },
        handleInputChange(e: any): void {
            const fieldName: string = e.target.name;
            const fieldValue: string = e.target.value;
            const newField: PokemonField = { [fieldName]: { value: fieldValue } };
            this.setform({ ...this.form, ...newField } as Pokemonform);
        },
        selectType(type: string, e: any): void {
            const checked = e.target.checked;
            let newField: PokemonField;
            if (checked) {
                // Si l'utilisateur coche un type, à l'ajoute à la liste des types du pokémon.
                const newTypes: string[] = this.form?.types.value.concat([type]);
                newField = { value: newTypes };
            }
            else {
                // Si l'utilisateur décoche un type, on le retire de la liste des types du pokémon.
                const newTypes: string[] = this.form?.types.value.filter((currentType: string) => currentType !== type);
                newField = { value: newTypes };
            }
            this.setform({ ...this.form, ...{ types: newField } } as Pokemonform);
        },
        handleSubmit(e: any) {
            e.preventDefault();
            let newForm: Pokemonform = this.form as Pokemonform;
            validateForm(newForm, this.pokemon.id > 0).then(validForm => {
                this.setform(validForm.form);
                console.log('valid:' + validForm.isValid);
                if (validForm.isValid) {
                    this.pokemon.picture = this.form?.picture.value;
                    this.pokemon.name = toPascalCase(this.form?.name.value);
                    this.pokemon.hp = +this.form?.hp.value;
                    this.pokemon.cp = +this.form?.cp.value;
                    this.pokemon.types = this.form?.types.value;
                    this.isEditForm ? this.updatePokemon() : this.addPokemon();
                }
            });
        },
        setform(form: Pokemonform) {
            this.form = form;
        },
        deletePokemon() {
            PokemonService.deletePokemon(this.pokemon).then(() => this.$router.push("/pokemons"));
        },
        isTypeValid(form: Pokemonform, type: string): boolean {
            return isTypesValid(form, type);
        },
        addPokemon() {
            PokemonService.addPokemon(this.pokemon).then(() => this.$router.push("/pokemons"));
        },
        updatePokemon() {
            PokemonService.updatePokemon(this.pokemon).then(() => this.$router.push(`/pokemons/${this.pokemon.id}`));
        },
        searchPokemonImage() {
            this.$router.push("/pokemons/images");
        },
        setPictureUrl(url: string): void {
            if(this.form){
                this.form.picture.value = url;
            }
            
        }
    },
    mounted() {
        this.initform();
        this.types = Types;
    },
    components: {
        PokemonImageCard
    }
}

</script>
<script setup lang="ts">
import type { PropType } from 'vue';
import type Pokemon from '@/models/pokemon';
import type Pokemonform from '@/tools/pokemon-form-property';
import type PokemonField from '@/tools/pokemon-field-property';
import validateForm from '@/validation/pokemon-form-validation'
import PokemonService from '@/services/pokemon-service';
import type PokemonForm from '@/tools/pokemon-form-property';
import Types from '@/tools/pokemon-types';
import isTypesValid from '@/validation/pokemon-type-validation'
import formatType from '@/tools/format-type'
import { toPascalCase } from '@/tools/format-string';
import PokemonImageCard from '@/components/PokemonImageCard.vue'
</script>

<template>
    <form @submit="handleSubmit">
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="card hoverable">
                    <div v-if="form?.picture.value !== ''" className="card-image">
                        <img :src="form?.picture.value" :alt="form?.name.value" style="width: 250px; margin: 0 auto" />
                        <span className="btn-floating halfway-fab waves-effect waves-light">
                            <i v-if="pokemon.id > 0" @click="deletePokemon" className="material-icons">delete</i>
                            <i v-else @click="initform()" className="material-icons">refresh</i>
                        </span>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <!-- Pokemon picture -->
                            <div v-if="form?.picture.value === ''" className="form-group">
                                <label htmlFor="picture">Image</label>
                                <div className="card-image">
                                    <div v-if="urls && urls.length > 0">
                                        <div className="container">
                                                <div className="row" style="overflow:auto; height: 550px;">
                                                    <PokemonImageCard v-for="url in urls" :key="urls.indexOf(url)" @click="setPictureUrl(url)"
                                                        :Url="url" />
                                                </div>
                                        </div>

                                    </div>
                                    <!-- <input id="picture" type="text" name="picture" className="form-control"
                                        :value="form?.picture.value" @change="handleInputChange"> -->
                                    <!-- Error -->
                                    <div v-if="form?.picture.error" className="card-panel red accent-1">
                                        {{ form.picture.error }}
                                    </div>
                                </div>
                            </div>
                            <!-- Pokemon name -->
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input id="name" name="name" type="text" className="form-control" :value="form?.name.value"
                                    @change="handleInputChange" />
                                <!-- Error -->
                                <div v-if="form?.name.error" className="card-panel red accent-1">
                                    {{ form.name.error }}
                                </div>
                            </div>
                            <!-- Pokemon hp -->
                            <div className="form-group">
                                <label htmlFor="hp">Point de vie</label>
                                <input id="hp" name="hp" type="number" className="form-control" :value="form?.hp.value"
                                    @change="handleInputChange" />
                                <!-- Error -->
                                <div v-if="form?.hp.error" className="card-panel red accent-1">
                                    {{ form.hp.error }}
                                </div>
                            </div>
                            <!-- Pokemon cp -->
                            <div className="form-group">
                                <label htmlFor="cp">Dégâts</label>
                                <input id="cp" name="cp" type="number" className="form-control" :value="form?.cp.value"
                                    @change="handleInputChange" />
                                <!-- Error -->
                                <div v-if="form?.cp.error" className="card-panel red accent-1">
                                    {{ form.cp.error }}
                                </div>
                            </div>
                            <!-- Pokemon types -->
                            <div className="form-group">
                                <label htmlFor="types">Types</label>
                                <div v-for="type in types" :key="types.indexOf(type)" style="margin-bottom: 10px;">
                                    <label>
                                        <input id={type} type="checkbox" className="filled-in" :checked="hasType(type)"
                                            :disabled="!isTypeValid(form as Pokemonform, type)"
                                            @change="$Event => selectType(type, $Event)">
                                        <span>
                                            <p :className="formatType(type)">{{ type }}</p>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action center">
                            <!-- Submit button -->
                            <button type="submit" className="btn">Valider</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>