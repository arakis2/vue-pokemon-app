<script lang="ts">

import formatDate from '../tools/format-date';
import PokemonTypes from '../components/PokemonTypes.vue'
export default {
    props: {
        pokemon: {
            type: Object,
            required: true
        },
        borderColor: {
            type: String,
            default: '#009688',
            required: false
        },
    },
    data() {
        return {
            defaultColor: '#f5f5f5',
            color: '#f5f5f5',
            formatDate: formatDate
        }
    },
    methods: {
        hideBorder() {
            this.setColor(this.defaultColor);
        },
        showBorder() {
            this.setColor(this.borderColor);
        },
        setColor(color: string): void {
            this.color = color;
        },
        goToPokemon(id: number): void {
            this.$router.push(`/pokemons/${id}`);
        }
    },
    components: {
        PokemonTypes
    }
}
</script>

<template>
    <div className="col s6 m4" @click="() =>  goToPokemon(pokemon.id)" @mouseenter="showBorder" @mouseleave="hideBorder">
        <div className="card horizontal" :style="{'border-color': color}">
            <div className="card-image">
                <img :src="pokemon.picture" :alt="pokemon.name" />
            </div>
            <div className="card-stacked">
                <div className="card-content">
                    <p><b>{{pokemon.name}}</b></p>
                    <p><small>{{formatDate(pokemon.created)}}</small></p>
                    <PokemonTypes :key="pokemon.id" :Types="pokemon.types" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .horizontal{
    border: solid 4px #f5f5f5;
    height: 200px;
}
</style>