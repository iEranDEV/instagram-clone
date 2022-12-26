<template>
	<div class="flex flex-col justify-between md:justify-start md:flex-row">

		<!-- Search menu -->
		<div class="fixed flex flex-col gap-4 bg-white h-screen w-full md:w-96 transition-all duration-500 p-4 z-20 md:border-r-2 border-gray-200" :class="searchMenu ? 'right-0 md:left-20 lg:left-52' : '-left-full'">
            <div class="flex justify-end cursor-pointer">
				<svg @click="toggleSearch()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor pointer">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<form @submit.prevent="search()" class="w-full rounded-lg overflow-hidden flex gap-2">
				<input type="text" v-model="searchVal" placeholder="Type something" class="form-input bg-stone-100 w-full">
				<button type="submit" class="h-full bg-sky-500 text-stone-100 p-2 rounded-lg flex justify-center items-center cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
				</button>
			</form>

			<hr>

			<div v-if="results.length > 0" class="w-full h-full overflow-auto flex flex-col gap-4">
				<!--<p v-for="number in 200" :key="number">test</p>-->
				<div v-for="result in results" :key="result.uid" class="w-full flex items-center gap-4">
					<NuxtLink :to="'/user/' + result.uid" class="w-full flex items-center gap-4">
						<img :src="result.photoURL" alt="Picture" class="h-10 w-10 rounded-full">
						<div class="flex flex-col justify-center">
							<p class="font-semibold">{{ result.displayName }}</p>
							<span class="text-sm text-gray-400">{{ result.fullName }}</span>
						</div>
					</NuxtLink>
				</div>
			</div>
			<div v-else class="w-full h-full flex justify-center items-center flex-col text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-8 h-8">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p>No users with given name were found</p>
			</div>

		</div>	

		<!-- Navbar -->
		<nav class="bg-white w-full md:h-screen md:w-20 lg:w-52 border-t-2 border-stone-200 md:border-t-0 z-30 flex justify-center md:justify-around md:items-center md:flex-col fixed bottom-0 ">
			<!-- Logo -->
			<div class="flex justify-center items-center">
				<img src="~/assets/instagram_logo.png" alt="Logo" class="w-32 hidden lg:block">
				<img src="~/assets/Instagram_logo_small.webp" alt="Logo" class="w-10 h-10 hidden md:block lg:hidden">
			</div>
			
			<!-- Links -->
			<div class="w-full lg:w-52 flex justify-around md:justify-center md:flex-col">
				<!-- Home link -->
				<NavButton route="/">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
						</svg>
					</template>
					<template #name>Home</template>
				</NavButton>

				<!-- Dicover link -->
				<div @click="toggleSearch()" class="bg-white w-full flex gap-4 justify-center items-center py-4 lg:py-3 lg:px-8 md:justify-center lg:justify-start hover:bg-stone-50 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
					<p class="hidden lg:block">Search</p>
				</div>

				<!-- Create post link -->
				<NavButton route="/post/new">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</template>
					<template #name>Create</template>
				</NavButton>

				<!-- Saved link -->
				<NavButton route="/post/saved">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
						</svg>
					</template>
					<template #name>Saved</template>
				</NavButton>

				<!-- Profile link -->
				<NavButton route="/user/">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</template>
					<template #name>Profile</template>
				</NavButton>
			</div>
			
			<!-- Additional links -->
			<div class="hidden w-full lg:w-52 md:flex justify-around md:justify-center md:flex-col">
				<NavButton route="/user/settings">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</template>
					<template #name>Settings</template>
				</NavButton>
				<NavButton route="/test">
					<template #icon>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
						</svg>
					</template>
					<template #name>Help center</template>
				</NavButton>
			</div>
		
		</nav>

		<!-- Current page view-->
		<slot v-if="$store.state.loaded" />
		<div v-else class="w-full page flex justify-center items-center">
			<svg class="animate-spin h-8 w-8" fill="#6b7280" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>
		</div>

		<!-- Notifications -->
		<div class="fixed top-0 right-0 h-10 w-80 m-2 flex flex-col">
			<!--<notification-element :error="false" message="test" />-->
			<notification-element v-for="notification in $store.state.notifications" :error="notification.error" :message="notification.message" :key="notification.message" />
		</div>

	</div>	
</template>

<script lang="ts">
import { collection, query, where, getDocs } from "firebase/firestore";

export default defineComponent({
	setup() {
		const searchMenu = ref(false);
		const searchVal = ref('');
		const firebase = useFirebase();

		return {
			searchMenu,
			searchVal,
			firebase,
		}
	},
	data() {
		return {
			results: Array<User>(),
			notifications: Array<string>(),
		}
	},
	methods: {
		toggleSearch() {
            this.searchMenu = !this.searchMenu;
		},
		async search() {
			this.results = [];
			const q = query(collection(this.firebase.firestore, "users"), where('displayName', '>=', this.searchVal), where('displayName', '<=', this.searchVal + 'z'));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				this.results.push(doc.data() as User);
			})
			this.searchVal = '';
		}
	},
	watch: {
		$route() {
			this.searchMenu = false;
		}
	}
})
</script>

<style>

</style>