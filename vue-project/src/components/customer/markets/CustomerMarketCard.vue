<template>
	<div>
		<!-- <p>[CustomerMarketCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid grid-flow-row gap-2">
				<div class="flex justify-center text-sm">
					{{ this.$props.market.brand.businessName }}
				</div>
				<div><img :src="`${this.$props.market.image.url}`" /></div>
				<div class="grid grid-flow-col">
					<div>{{ this.$props.market.closeDateTime }}</div>
					<div class="flex justify-end">좋아요</div>
				</div>
				<div class="flex justify-center text-sm">
					{{ this.$props.market.title }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		setup() {},
		components: {},
		props: ["market"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>