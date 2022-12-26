<template>
    <div class="aspect-square z-10 relative w-full md:max-w-md lg:max-w-lg">
        <img :src="photos[currentPhoto]" alt="Image" class="w-full md:max-w-md lg:max-w-lg aspect-square">

        <!-- Counter -->
        <div class="absolute bg-gray-100/[.09] top-0 right-0 m-2 rounded-full px-2 py-1">
            <p class="text-gray-300 md:text-sm">{{currentPhoto + 1}}/{{photos.length}}</p>
        </div>

        <!-- Left arrow -->
        <div v-if="currentPhoto > 0" @click="currentPhoto--" class="absolute top-1/2 left-0 text-white mx-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>

        <!-- Right arrow -->
        <div v-if="currentPhoto < photos.length - 1" @click="currentPhoto++" class="absolute top-1/2 right-0 text-white mx-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    data() {
        return {
            currentPhoto: 0,
        }
    },
    props: {
        photos: Array
    }
})
</script>


<style>

</style>