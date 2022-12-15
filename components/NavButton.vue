<template>
	<NuxtLink :to="route" class="w-full">
        <div class="bg-white flex gap-4 justify-center items-center md:justify-start py-4 md:py-3 md:px-8 hover:bg-stone-50" :class="{ 'active-navbar-item':  useRoute().fullPath == route}">
            <slot name="icon" />
            <p class="hidden md:block">
                <slot name="name" />
            </p>
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