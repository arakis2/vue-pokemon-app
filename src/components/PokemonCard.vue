<script lang="ts">
export default {
    props: {
        pokemon: {
            type: Object as PropType<Pokemon>,
            required: true
        }
    },
    data() {
        return {
            formatDate: formatDate
        }
    },
    methods: {
        goToPokemon(id: number): void {
            this.$router.push(`/pokemons/${id}`);
        }
    },
    components: {
        PokemonTypes
    }
}
</script>
<script setup lang="ts">
import formatDate from '@/tools/format-date';
import PokemonTypes from '@/components/PokemonTypes.vue'
import type { PropType } from 'vue';
import type Pokemon from '@/models/pokemon';
</script>

<template>
    <div className="col s6 m4" @click="() => goToPokemon(pokemon.id)">
        <div className="card hoverable">
            <div className="card horizontal">
                <div className="card-image">
                    <img :src="pokemon.picture" :alt="pokemon.name" />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p><b>{{ pokemon.name }}</b></p>
                        <p><small>{{ formatDate(pokemon.created) }}</small></p>
                        <PokemonTypes :key="pokemon.id" :Types="pokemon.types" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.horizontal {
    border: solid 4px #f5f5f5;
    height: 200px;
}
</style>