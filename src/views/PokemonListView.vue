<script lang="ts">
import POKEMONS from '@/models/mock-pokemon';
import PokemonCard from '../components/PokemonCard.vue'
import PokemonLoader from '../components/PokemonLoader.vue'

export default {
    data() {
        return {
            pokemons: POKEMONS
        }
    },
    components: {
        PokemonCard,
        PokemonLoader
    }

}

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
