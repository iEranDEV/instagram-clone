<template>
	<div class="bg-gray-100 text-stone-700 rounded-lg md:border md:border-gray-300 px-4 pt-16 h-full w-full md:h-auto md:w-auto flex flex-col gap-10 items-center justify-center">
		<!-- Instagram clone logo -->
		<img src="~/assets/instagram_logo.png" alt="Logo" class="w-52">

		<!-- Login form -->
		<form @submit.prevent="login()" class="w-full flex flex-col gap-4">
			
			<!-- Email input -->
			<input type="email" v-model="email" placeholder="Email address" class="p-2 rounded-lg w-full md:w-96">

			<!-- Password input -->
			<input type="password" v-model="password" placeholder="Password" class="p-2 rounded-lg w-full md:w-96">

			<!-- Log in button -->
			<button type="submit"  class="p-2 rounded-lg bg-sky-500 text-stone-100 font-semibold">Log in</button>

			<!-- Error message box -->
			<p v-if="error" class="w-full rounded-xl border-2 border-red-500 bg-red-200 px-4 py-2 text-red-500 font-semibold md:w-96 text-sm">
				{{ error }}
			</p>

			<!-- Important links -->
			<div class="flex flex-col gap-2 mt-16 mb-4">
				<a href="#" class="text-sky-500 font-semibold">Forgotten your password?</a>
				<p class="text-stone-400">
					Don't have an account? 
					<NuxtLink to="/accounts/register" class="text-sky-500 font-semibold">Sign up</NuxtLink>
				</p>
			</div>

		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { loginUser } from '~/composables/firebase';

export default defineComponent({
	setup() {
		definePageMeta({
			layout: "accounts",
		});

		const email = ref('');
		const password = ref('');
		const error = ref('');

		return {
			email,
			password,
			error,
		}
	},
	methods: {
		async login() {
			// Get data from response
			let data = await loginUser(this.email, this.password);
			
			// Check if returned data is error
			if(data.code != null) {

				// Handle and set error message according to error code
				switch(data.code) {
					case 'auth/wrong-password':
						this.error = 'Invalid password!';
						break;
				}
				console.log(data.code + ' ' + data.message);

			}
		}
	}
})
</script>

<style>

</style>