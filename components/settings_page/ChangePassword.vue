<template>
    <div class="w-full h-full overflow-auto pb-20 md:pr-4">
        <form @submit.prevent="changePassword" class="h-full w-full flex flex-col gap-8">

            <!-- Old password -->
            <div class="max-w-md">
                <label for="old_password" class="font-semibold">Old password</label>
                <input v-model="old_password" type="password" id="old_password" name="old_password" placeholder="Old password" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    Enter your current password to verify your identity
                </p>
            </div>

            <!-- New password -->
            <div class="max-w-md">
                <label for="new_password" class="font-semibold">New password</label>
                <input v-model="new_password" type="password" id="new_password" name="new_password" placeholder="New password" class="form-input bg-stone-100 my-1">
            </div>

            <!-- Old password -->
            <div class="max-w-md">
                <label for="new_password_confirmation" class="font-semibold">Confirm new password</label>
                <input v-model="new_password_confirmation" type="password" id="new_password_confirmation" name="new_password_confirmation" placeholder="New password" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    Repeat the password you want to set
                </p>
            </div>

            <button type="submit" class="btn bg-sky-500 md:w-40">Change password</button>

        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const old_password = ref('');
        const new_password = ref('');
        const new_password_confirmation = ref('');

        return {
            old_password,
            new_password,
            new_password_confirmation
        }
    },
    methods: {

    }
})
</script>


<style>

</style>