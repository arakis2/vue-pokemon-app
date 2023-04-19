<script lang="ts">

    import PokemonTypes from '@/components/PokemonTypes.vue';
    import Pokemon from '../models/pokemon'
    import POKEMONS from '@/models/mock-pokemon';
    import formatDate from '../tools/format-date';
    import PokemonLoader from '../components/PokemonLoader.vue'

    export default {
    props: {
        Pokemons: Array<Pokemon>,
        Pokemon: {
            type: Pokemon,
            required: false
        }
    },
    data() {
        return {
            pokemons: this.Pokemons,
            pokemon: this.Pokemon,
            formatDate: formatDate
        };
    },
    mounted() {
        this.pokemons = POKEMONS;
        this.pokemon = this.pokemons.find(x => x.id === +this.$route.params.id);
    },
    components: { 
        PokemonTypes,
        PokemonLoader
    }
}
</script>

<template>
    <div>
        <div v-if="pokemon" className="row">
            <div className="col s12 m8 offset-m2">
                <h2 className="header center">
                    {{ pokemon.name }}
                </h2>
                <div className="card hoverable">
                    <div className="card-image">
                        <img :src="pokemon.picture" :alt="pokemon.name" style="width: 250px; margin: 0 auto" />
                        <div className="btn btn-floating halfway-fab waves-effect waves-light">
                            <RouterLink :to="`/pokemons/edit/${pokemon.id}`">
                                <i className="material-icons">edit</i>
                            </RouterLink>
                        </div>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <table className="bordered striped">
                                <tbody>
                                    <tr>
                                        <th>nom</th>
                                        <td>{{ pokemon.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Points de vie</th>
                                        <td>{{ pokemon.hp }}</td>
                                    </tr>
                                    <tr>
                                        <th>Dégâts</th>
                                        <td>{{ pokemon.cp }}</td>
                                    </tr>
                                    <tr>
                                        <th>Types</th>
                                        <td><PokemonTypes :Types="pokemon.types" :key="pokemon.id" /></td>
                                    </tr>
                                    <tr>
                                        <th>Date de création</th>
                                        <td>{{ formatDate(pokemon.created) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-action">
                            <RouterLink to="/">Retour</RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h4 className="center">
                <PokemonLoader />
            </h4>
        </div>
    </div>
</template>