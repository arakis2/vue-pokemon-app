<script lang="ts">
export default {
    data() {
        return {
            urls: [] as string[]
        };
    },
    mounted() {
        PokemonService.getImageUrls().then(imgs => {
                this.urls = imgs;
            });

    },
    components: {
        PokemonLoader,
        PokemonImageCard
    }
}
</script>
<script setup lang="ts">
import PokemonLoader from '@/components/PokemonLoader.vue'
import PokemonImageCard from '@/components/PokemonImageCard.vue'
import PokemonService from '@/services/pokemon-service';
</script>
<template>
    <div>
        <div v-if="urls && urls.length > 0">
            <h2 className="header center">Rechercher l'image du pokémon</h2>
            <div className="container">
                <div className="row">
                    <PokemonImageCard v-for="url in urls" :key="urls.indexOf(url)" :Url="url"
                    :Title="`Image ${urls.indexOf(url) + 1}`" />
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