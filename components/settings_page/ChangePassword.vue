<template>
    <div class="w-full h-full overflow-auto pb-20 md:pr-4">
        <div class="h-full w-full flex flex-col gap-8">

            <!-- Old password -->
            <div class="max-w-md">
                <label for="old_password" class="font-semibold">Old password</label>
                <input type="password" id="old_password" name="old_password" placeholder="Old password" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    Enter your current password to verify your identity
                </p>
            </div>

            <!-- New password -->
            <div class="max-w-md">
                <label for="new_password" class="font-semibold">New password</label>
                <input type="password" id="new_password" name="new_password" placeholder="New password" class="form-input bg-stone-100 my-1">
            </div>

            <!-- Old password -->
            <div class="max-w-md">
                <label for="old_password" class="font-semibold">Confirm new password</label>
                <input type="password" id="old_password" name="old_password" placeholder="New password" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    Repeat the password you want to set
                </p>
            </div>

            <button class="btn bg-sky-500 md:w-40">Change password</button>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>