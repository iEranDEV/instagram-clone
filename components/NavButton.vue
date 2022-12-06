<template>
	<NuxtLink :to="route" class="w-full">
        <div class="py-2 w-full bg-white hover:bg-stone-100 px-3">
            <slot />
        </div>
    </NuxtLink>	
</template>

<script lang="ts">

export default defineComponent({
    setup() {

    },
    props: {
        route: {
            type: String,
            required: true,
            default: '/'
        }
    }
})
</script>

<style>

</style>