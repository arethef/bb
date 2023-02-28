<template>
	<div>
		<!-- <p>[CustomerProductCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid grid-flow-row gap-2">
				<div class="flex justify-center text-sm">
					{{ this.$props.product.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		setup() {},
		components: {},
		props: ["product"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>