<template>
    <div class="page w-full h-screen md:p-32">

        <!-- Menu -->
        <div class=" bg-white p-6 absolute md:hidden -top-60 w-full transition-all rounded-b-lg border-b-2 border-gray-200 flex flex-col gap-3" :class="{activeMenu: menu}">
            <div class="flex justify-end">
                <svg @click="toggleMenu()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <!-- Items -->
            <div>item 1</div>
            <div>item 2</div>
        </div>

        <div class="w-full h-screen md:h-full bg-red-500 md:rounded-lg py-6 px-6">
            <div class="w-full flex justify-end">
                <svg @click="toggleMenu()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const menu = ref(false);

        return {
            menu
        }
    },
    methods: {
        toggleMenu() {
            this.menu = !this.menu;
            console.log(this.menu);
        }
    }
})
</script>

<style scoped>
.activeMenu {
    top: 0px;
}
</style>