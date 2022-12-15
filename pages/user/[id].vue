<template>
    <div class="w-full page" id="test">
        <p>
            {{ useRoute().params.id }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<style>

</style>