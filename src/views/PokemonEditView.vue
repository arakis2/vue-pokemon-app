<script lang="ts">

import type Pokemon from '@/models/pokemon';
import PokemonService from '@/services/pokemon-service';
import PokemonForm from '@/components/PokemonForm.vue';
import PokemonLoader from '@/components/PokemonLoader.vue'

export default {  
    data() {
        return {
            pokemon: undefined as Pokemon|null|undefined,
        }
    },
    mounted () {
        PokemonService.getPokemon(+this.$route.params.id).then(pokemon => this.pokemon = pokemon);
    },
    components:{
        PokemonForm,
        PokemonLoader
    }
}
</script>

<template>
    <div>
        <div v-if="pokemon" className="row">
            <h2 className="header center">Éditer {{ pokemon.name }}</h2>
            <PokemonForm :Pokemon="pokemon" :IsEditForm="true" />
        </div>
        <div v-else>
            <h4 className="center">
                <PokemonLoader />
            </h4>
        </div>
    </div>
</template>