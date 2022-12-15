<template>
	<div class="bg-gray-100 text-stone-700 rounded-lg md:border md:border-gray-300 px-4 pt-16 h-full w-full md:h-auto md:w-auto flex flex-col gap-10 items-center justify-center">
		<!-- Instagram clone logo -->
		<img src="~/assets/instagram_logo.png" alt="Logo" class="w-52">

		<!-- Login form -->
		<form @submit.prevent="register()" class="w-full flex flex-col gap-4">
			
			<!-- Email input -->
			<input type="email" v-model="email" placeholder="Email address" class="form-input md:w-96">

            <!-- Username input -->
			<input type="text" v-model="username" placeholder="Username" class="form-input md:w-96">

			<!-- Full name input -->
			<input type="text" v-model="fullname" placeholder="Full name" class="form-input md:w-96">

			<!-- Password input -->
			<input type="password" v-model="password" placeholder="Password" class="form-input md:w-96">

			<!-- Log in button -->
			<button type="submit" class="btn bg-sky-500">Sign up</button>

			<!-- Error message box -->
			<p v-if="error" class="w-full rounded-xl border-2 border-red-500 bg-red-200 px-4 py-2 text-red-500 font-semibold md:w-96 text-sm">
				{{ error }}
			</p>

			<!-- Important links -->
			<div class="flex flex-col gap-2 mt-16 mb-4 md:text-sm">
				<p class="text-stone-400">By signing up, you agree to our <a href="#" class="underline">Terms</a>.</p>
				<p class="text-stone-400">
					Don't have an account? 
					<NuxtLink to="/accounts/login" class="text-sky-500 font-semibold">Log in</NuxtLink>
				</p>
			</div>

		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createUser } from '~/composables/firebase';

export default defineComponent({
	setup() {
		definePageMeta({
			layout: "accounts",
		});

		const email = ref('');
		const username = ref('');
		const password = ref('');
		const error = ref('');
		const fullname = ref('');

		return {
			email,
			username,
			password,
			error,
			fullname
		}
	},
	methods: {
		async register() {
			// Get data from response
			let data = await createUser(this.email, this.password, this.username, this.fullname);
			
			// Check if returned data is error
			if(data.code != null) {

				// Handle and set error message according to error code
				switch(data.code) {
					case 'auth/invalid-email':
						this.error = 'Invalid email!';
						break;
					case 'auth/internal-error':
						this.error = 'A problem occured! Please refresh the page and try again.';
						break;
					case 'auth/weak-password':
						this.error = 'Your password is too weak, try a stronger one.';
						break;
					case 'auth/email-already-in-use':
						this.error = 'This email is already in use. If it belongs to you, try logging in.';
						break;
				}

			}
		}
	}
})
</script>


<style>

</style>