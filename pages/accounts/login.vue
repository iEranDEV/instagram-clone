<template>
	<div class="bg-gray-100 text-stone-700 rounded-lg md:border md:border-gray-300 px-4 pt-16 h-full w-full md:h-auto md:w-auto flex flex-col gap-10 items-center justify-center">
		<!-- Instagram clone logo -->
		<img src="~/assets/instagram_logo.png" alt="Logo" class="w-52">

		<!-- Login form -->
		<form @submit.prevent="login()" class="w-full flex flex-col gap-4">
			
			<!-- Email input -->
			<input type="email" v-model="email" placeholder="Email address" class="form-input md:w-96">

			<!-- Password input -->
			<input type="password" v-model="password" placeholder="Password" class="form-input md:w-96">

			<!-- Log in button -->
			<button type="submit"  class="btn bg-sky-500">Log in</button>

			<!-- Error message box -->
			<p v-if="error" class="w-full rounded-xl border-2 border-red-500 bg-red-200 px-4 py-2 text-red-500 font-semibold md:w-96 text-sm">
				{{ error }}
			</p>

			<!-- Important links -->
			<div class="flex flex-col gap-2 mt-16 mb-4 md:text-sm">
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
import { FirebaseError } from '@firebase/util';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc,  } from 'firebase/firestore';
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		definePageMeta({
			layout: "accounts",
		});

		const firebase = useFirebase();

		const email = ref('');
		const password = ref('');
		const error = ref('');

		return {
			email,
			password,
			error,
			firebase,
		}
	},
	methods: {
		// Firebase auth login user
		async loginFirebaseUser(email: string, password: string): Promise<User|FirebaseError|undefined> {
			return signInWithEmailAndPassword(this.firebase.auth, email, password).then(async (userCredentials) => {
				const user_data = userCredentials.user;
				const userSnap = await getDoc(doc(this.firebase.firestore, "users", user_data.uid));
				if(userSnap.exists()) {
					const data = userSnap.data();
					const user: User = {
						uid: data.uid,
						displayName: data.displayName,
						fullName: data.fullName,
						email: data.email,
						createdAt: data.createdAt,
						photoURL: data.photoURL,
						bio: data.bio
					}
					useState('user', () => user);
					navigateTo('/test');
					return user;
				}
			}).catch((error) => {
				return error as FirebaseError;
			});
		},
		
		async login() {
			// Get data from response
			let data = await this.loginFirebaseUser(this.email, this.password);
			
			// Check if returned data is error
			if(data instanceof Error) {

				// Handle and set error message according to error code
				switch(data.code) {
					case 'auth/wrong-password':
						this.error = 'Invalid password!';
						break;
				}

			}
		}
	}
})
</script>

<style>

</style>