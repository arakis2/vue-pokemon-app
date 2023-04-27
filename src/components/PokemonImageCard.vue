<script lang="ts">
    export default {
        data() {
            return {
                maxCount: 0,
                urls: [] as string[]
            }
        },
        created() {
            this.fillImg();
        },
        methods: {
            fillImg(): void {
                let exists = true;
                const tmpUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png';
                let i = 1;
                while(exists) {
                    const formatNumber = (`000${i}`).slice(-3);
                    const img = tmpUrl.replace('XXX', formatNumber);

                    const rawFile = new XMLHttpRequest();
                    rawFile.open('GET', img, false);
                    rawFile.onreadystatechange = () => {
                        if(rawFile.readyState === 4)
                        {
                            if(rawFile.status === 200 || rawFile.status == 0)
                            {
                                this.urls.push(img);
                                i++;
                            }
                        } else {
                            exists = false;
                        }
                    }
                }

            }
        }
    }

</script>
<script setup lang="ts">

</script>
<template>
    <div>

    </div>
</template>