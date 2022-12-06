<template>
	<NuxtLink :to="route" class="w-full">
        <div class="bg-white flex justify-center items-center py-4">
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