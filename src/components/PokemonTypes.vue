<script lang="ts">
    import formatType from '@/tools/format-type'

    export default {
        props: {
            Types: {
                type: Array<String>,
                required: true
            }

        },
        data(){
            return {
                types: this.Types,
                formatType: formatType
            }
        },
        mounted() {
            this.types = this.types.sort();
        }
    }
</script>

<template>
    <div>
        <span v-for="type in types" :key="types.indexOf(type)" :className="formatType(type.toString())">
            {{ type }}
        </span>
    </div>
</template>