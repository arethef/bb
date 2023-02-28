<template>
	<div class="container mx-auto">
		<div class="flex justify-end mb-4">
			<button
				@click="moveBrandMarketNewView"
				class="inline-block px-4 py-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				type="button"
			>
				마켓추가
			</button>
		</div>
	</div>
</template>

<script>
	import { useImageStore } from "@/stores/image";
	export default {
		setup() {
			const imageStore = useImageStore();
			return { imageStore };
		},
		components: {},
		data() {
			return {};
		},
		created() {},
		methods: {
			moveBrandMarketNewView() {
				this.$router.push("/b/markets/new");
			},
		},
	};
</script>

<style></style>
