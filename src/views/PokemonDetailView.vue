<script lang="ts">
export default {
    data() {
        return {
            pokemon: undefined as Pokemon | undefined | null,
            formatDate: formatDate
        };
    },
    mounted() {
        PokemonService.getPokemon(+this.$route.params.id).then(pokemon => this.pokemon = pokemon)
    },
    components: {
        PokemonTypes,
        PokemonLoader
    }
}
</script>
<script setup lang="ts">
import PokemonTypes from '@/components/PokemonTypes.vue';
import formatDate from '@/tools/format-date';
import PokemonLoader from '@/components/PokemonLoader.vue'
import PokemonService from '@/services/pokemon-service';
import type Pokemon from '@/models/pokemon';
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
                                        <td>
                                            <PokemonTypes :Types="pokemon.types" :key="pokemon.id" />
                                        </td>
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