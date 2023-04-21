<script lang="ts">
export default {
    props: {
        Pokemons: Object as PropType<Pokemon[]>
    },
    data() {
        return {
            searchPokemons: [] as Pokemon[],
            pokemons: this.Pokemons, // pour tuto. Ici on est très perf. La question de l'appel api se poserait si plusieurs pages.
            term: ''
        }
    },
    emits: ['result'],
    methods: {
        handleInputChange(e: any): void {
            this.term = e.target.value;

            if (this.term.length < 2) {
                this.searchPokemons = [];
                this.$emit('result', []);

            } else {
                const pokemons = this.pokemons?.filter(pokemon => pokemon.name.toUpperCase().includes(this.term.toUpperCase())) ?? [];
                this.searchPokemons = pokemons;
                this.$emit('result', pokemons);
            }           
        }
    }
}
</script>
<script setup lang="ts">
import type Pokemon from '@/models/pokemon';
import type { PropType } from 'vue';
</script>
<template>
    <div className="row">
        <div className="col s12 m6 offset-m3">
            <div className="card">
                <div className="card-content">
                    <div className="input-field">
                        <input type="text" placeholder="Rechercher un pokémon" :value="term" @keyup="handleInputChange" />
                    </div>
                    <div className='collection'>
                        <div v-for="pokemon in searchPokemons" :key="pokemon.id">
                            <RouterLink className="collection-item" :to="`/pokemons/${pokemon.id}`">
                                {{ pokemon.name }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>