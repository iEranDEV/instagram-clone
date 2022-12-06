<template>
    <div>
        <!-- View when user is logged in -->
        <section v-if="useState('user').value != undefined">
            Logged in
        </section>

        <!-- View when user is not logged in -->
        <section v-else class="h-screen w-screen flex flex-col gap-24 justify-center items-center">
            <img src="~/assets/instagram_logo.png" alt="Logo" class="w-52">
            <img src="~/assets/Secure.svg" alt="Svg character" class="w-40">
            <div class="flex flex-col gap-4 w-72">
                <NuxtLink to="/accounts/login"><button class="p-2 rounded-lg bg-sky-500 text-stone-100 font-semibold w-full">Log in</button></NuxtLink>
                <NuxtLink to="/accounts/register"><button class="p-2 rounded-lg bg-sky-500 text-stone-100 font-semibold w-full">Sign up</button></NuxtLink>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        definePageMeta({
			layout: "blank",
		});
    },
})
</script>
