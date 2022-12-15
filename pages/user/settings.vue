<template>
    <div class="page w-full h-screen md:px-32 md:py-16">

        <div class="w-full h-screen md:h-full md:rounded-lg py-6 bg-white md:flex">

            <!-- Menu -->
            <div class="bg-white p-6 md:px-0 md:py-0 absolute -top-96 w-full md:h-full md:w-80 transition-all md:top-0 left-0 md:static rounded-b-lg border-b-2 md:border-r-2 md:border-b-0 border-gray-200 flex flex-col gap-3 md:gap-0" :class="{activeMenu: menu}">
                <!-- Menu close -->
                <div class="flex justify-end">
                    <svg @click="toggleMenu()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 md:hidden">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <!-- Items -->
                <div class="settings-item" :class="{ 'font-semibold md:border-sky-500': page == 'edit_profile'}" @click="togglePage('edit_profile')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit profile
                </div>
                <div class="settings-item" :class="{ 'font-semibold md:border-sky-500': page == 'change_password'}" @click="togglePage('change_password')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Change password
                </div>
                <div class="settings-item" :class="{ 'font-semibold md:border-sky-500': page == 'email_notifications'}" @click="togglePage('email_notifications')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    E-mail notifications
                </div>
                <div class="settings-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    Help center
                </div>
                <div class="text-red-500 settings-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Log out
                </div>
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
            page,
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