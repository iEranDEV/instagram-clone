<template>
    <div class="page w-full h-screen md:px-32 md:py-16">

        <div class="w-full h-screen md:h-full md:rounded-lg py-6 bg-white md:flex">

            <!-- Menu -->
            <div class="bg-white p-6 md:px-0 md:py-0 absolute -top-96 w-full md:h-full md:w-72 transition-all md:top-0 left-0 md:static rounded-b-lg border-b-2 md:border-r-2 md:border-b-0 border-gray-200 flex flex-col gap-3 md:gap-0" :class="{activeMenu: menu}">
                <!-- Menu close -->
                <div class="flex justify-end">
                    <svg @click="toggleMenu()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:hidden">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <!-- Items -->
                <div class="cursor-pointer md:p-2 md:px-4 md:border-r-2 md:border-white md:hover:border-stone-200 md:hover:bg-stone-50" :class="{ 'font-semibold md:border-sky-500': page == 'edit_profile'}" @click="togglePage('edit_profile')">Edit profile</div>
                <div class="cursor-pointer md:p-2 md:px-4 md:border-r-2 md:border-white md:hover:border-stone-200 md:hover:bg-stone-50" :class="{ 'font-semibold md:border-sky-500': page == 'change_password'}" @click="togglePage('change_password')">Change password</div>
                <div class="cursor-pointer md:p-2 md:px-4 md:border-r-2 md:border-white md:hover:border-stone-200 md:hover:bg-stone-50" :class="{ 'font-semibold md:border-sky-500': page == 'email_notifications'}" @click="togglePage('email_notifications')">E-mail notifications</div>
                <div class="cursor-pointer md:p-2 md:px-4 md:border-r-2 md:border-white md:hover:border-stone-200 md:hover:bg-stone-50">Help center</div>
                <div class="text-red-500 cursor-pointer md:p-2 md:px-4 md:border-r-2 md:border-white md:hover:border-stone-200 md:hover:bg-stone-50">Log out</div>
            </div>

            <!-- Menu toggler -->
            <div class="w-full flex justify-end px-6 md:hidden">
                <svg @click="toggleMenu()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <!-- Content -->
            <p class="w-full px-6">
                <EditProfile v-if="page === 'edit_profile'"></EditProfile>
                <ChangePassword v-if="page === 'change_password'"></ChangePassword>
                <EmailNotifications v-if="page === 'email_notifications'"></EmailNotifications>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditProfile from '~/components/settings_page/EditProfile.vue';
import ChangePassword from '~/components/settings_page/ChangePassword.vue';
import EmailNotifications from '~/components/settings_page/EmailNotifications.vue';

export default defineComponent({
    setup() {
        const menu = ref(false);
        const page = ref('edit_profile');

        return {
            menu,
            page
        }
    },
    methods: {
        toggleMenu() {
            this.menu = !this.menu;
        },
        togglePage(page: string) {
            this.page = page;
            this.menu = !this.menu;
        }
    },
    components: {
        EditProfile,
        ChangePassword,
        EmailNotifications
    }
})
</script>

<style scoped>

.activeMenu {
    top: 0px;
}

</style>