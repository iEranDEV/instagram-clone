<template>
    <div class="w-full page" id="test">
        {{ useState('user').value.saved }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        definePageMeta({
            middleware: ['auth']
        });
    },
})
</script>

<style>

</style>