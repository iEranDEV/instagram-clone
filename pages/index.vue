<template>
    <div class="w-full page" id="test">
        <p>
            {{ $store.state.user }}
        </p>
        <p>
            {{ $store.state.loaded }}
        </p>
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

#test {
    height: 1000px;
}

</style>