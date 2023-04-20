<script lang="ts">
export default {
    data() {
        return {
            pokemons: [] as Pokemon[]
        }
    },
    components: {
        PokemonCard,
        PokemonLoader
    },
    mounted() {
        PokemonService.getPokemons().then(pokemons => this.pokemons = pokemons)
    }

}
</script>
<script setup lang="ts">
import PokemonCard from '../components/PokemonCard.vue'
import PokemonLoader from '../components/PokemonLoader.vue'
import PokemonService from '@/services/pokemon-service';
import type Pokemon from '@/models/pokemon';
</script>

<template>
    <div>
        <div v-if="pokemons && pokemons.length > 0">
            <p className='center'>
                Il y a <b>{{ pokemons.length }}</b> pokémon{{ pokemons.length > 1 ? 's' : '' }} dans le pokédex
            </p>
            <div className="container">
                <div className="row">
                    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
                </div>
            </div>
            <div className="btn-floating btn-large waves-effect waves-light red z-depth-3"
                style="position: fixed; bottom: 25px; right: 25px">
                <RouterLink to="/pokemons/add">
                    <i className="material-icons">add</i>
                </RouterLink>
            </div>
        </div>
        <div v-else>
            <h4 className="center">
                <PokemonLoader />
            </h4>
        </div>
    </div>
</template>
