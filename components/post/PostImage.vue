<template>
    <div class="w-full">
        <NuxtLink :to="'/post/' + post.id">
            <img :src="post.photos[0]" alt="Post" class="w-full aspect-square">
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        post: Object as PropType<Post>,
    }
})
</script>


<style>

</style>