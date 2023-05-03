<script lang="ts">
export default {
    components: {
        PokemonForm
    },
    data() {
        return {
            id: 0,
            pokemon: new Pokemon(0) // Pas cool ça
        }
    },
    mounted () {
        this.id = new Date().getTime();
        this.pokemon = new Pokemon(this.id);
    }
}
</script>

<script setup lang="ts">
import PokemonForm from '@/components/PokemonForm.vue'
import Pokemon from '@/models/pokemon';
</script>

<template>
    <div className="row">
        <h2 className="header center">Ajouter un pokémon</h2>
        <PokemonForm :Pokemon="pokemon" :IsEditForm="false" />
    </div>
</template>