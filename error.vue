<template>
    <div v-if="error">
        {{ error }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        error: Object
    }
})
</script>


<style>

</style>