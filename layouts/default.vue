<template>
	<div class="flex md:w-screen md:h-screen">

		<!-- Navbar -->
		<nav class="bg-white w-52 border-r-2 border-stone-200 flex flex-col justify-center items-center gap-2">
			<NavButton>
				test
			</NavButton>
			<NavButton>
				test
			</NavButton>
			<NavButton>
				test
			</NavButton>
			<NavButton>
				test
			</NavButton>
			<NavButton>
				test
			</NavButton>
		</nav>

		<!-- Current page view-->
		<slot />
	</div>	
</template>

<script lang="ts">

export default defineComponent({
	setup() {

	}
})
</script>

<style>

</style>