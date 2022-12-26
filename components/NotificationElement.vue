<template>
    <div class="w-full py-2 flex gap-2 justify-center transition-all items-center rounded-xl" :class="[error ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600']">
        <p v-if="error" class="font-semibold">Error!</p>
        <p v-else class="font-semibold">Success!</p>
        <span>{{ message }}</span>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    props: {
        error: {
            type: Boolean,
            default: true,
            required: false
        },
        message: {
            type: String,
            required: true
        }
    }
})
</script>


<style>

</style>