<template>
	<NuxtLink :to="route" class="w-full">
        <div class="bg-white flex gap-4 justify-center items-center py-4 lg:py-3 lg:px-8 md:justify-center lg:justify-start hover:bg-stone-50" :class="{ 'active-navbar-item':  useRoute().fullPath == route}">
            <slot name="icon" />
            <p class="hidden lg:block">
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