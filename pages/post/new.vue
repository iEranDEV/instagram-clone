<template>
    <div class="page w-full h-screen md:px-32 md:py-16">
        <div class="w-full h-screen md:h-full md:rounded-lg p-6 bg-white md:flex flex-col">

            <div class="w-full flex flex-col justify-center py-10 items-center border-2 border-gray-300 text-gray-300 border-dashed rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:text-gray-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p>
                    Click to <span class="font-semibold">upload photo</span>
                </p>
            </div>

            <div class="w-full grid grid-cols-5 gap-4">
                
            </div>

        </div>
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