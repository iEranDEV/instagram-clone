<template>
	<div class="h-screen w-screen bg-gray-200 flex items-center justify-around flex-col">
		<slot />
		<div class="hidden md:flex flex-col gap-4 items-center bg-gray-200">
			<p class="text-stone-400 md:text-sm bg-gray-200">Made by Narei</p>
			<div class="flex gap-6 md:text-sm bg-gray-200">
				<p class="text-stone-400 bg-gray-200">About</p>
				<p class="text-stone-400 bg-gray-200">Terms</p>
				<p class="text-stone-400 bg-gray-200">Privacy</p>
				<p class="text-stone-400 bg-gray-200">Blog</p>
			</div>
		</div>
	</div>	
</template>

<script>
export default {

}
</script>

<style>

</style>