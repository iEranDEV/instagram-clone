<template>
    <div class="w-full h-full overflow-auto pb-20 md:pr-4">
        <div class="h-full w-full flex flex-col gap-8">
            
            <!-- User avatar -->
            <div class="flex">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" alt="Avatar" class="w-16 rounded-full">
                <div class="flex flex-col h-full justify-center pl-5">
                    <p class="text-sky-500 font-semibold">Change your profile photo</p>
                    <p class="text-stone-400 text-sm">The recommended photo size is 512x512</p>
                </div>
            </div>

            <!-- Username -->
            <div class="max-w-md">
                <label for="username" class="font-semibold">Username</label>
                <input type="text" id="username" name="username" placeholder="Username" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    Your username is displayed on your profile and helps your friends find you. It is not used for logging in
                </p>
            </div>

            <!-- Full name -->
            <div class="max-w-md">
                <label for="fullname" class="font-semibold">Full name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Full name" class="form-input bg-stone-100 my-1">
            </div>

            <!-- BIO -->
            <div class="max-w-md">
                <label for="bio" class="font-semibold">Bio</label>
                <textarea name="bio" id="bio" cols="30" rows="3" class="form-input bg-stone-100 my-1" placeholder="Something cool B)" maxlength="200"></textarea>
                <p class="text-stone-400 text-sm">
                    0/200
                </p>
            </div>

            <!-- Email -->
            <div class="max-w-md">
                <label for="email" class="font-semibold">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" class="form-input bg-stone-100 my-1">
                <p class="text-stone-400 text-sm">
                    The e-mail address is used to log in to the website. Remember to confirm the new address after changing it
                </p>
            </div>

            <!-- Phone number -->
            <div class="max-w-md">
                <label for="phone" class="font-semibold">Phone number</label>
                <input type="tel" id="phone" name="phone" placeholder="Phone numer" class="form-input bg-stone-100 my-1">
            </div>

            <button class="btn bg-sky-500 md:w-40">Save changes</button>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>