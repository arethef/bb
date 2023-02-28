<template>
	<div>
		<!-- <p>[CustomerBrandDetailMarketsSection]</p> -->
		<!-- {{ this.$props.markets }} -->
		<div class="grid grid-cols-1 gap-4 overflow-y-scroll h-screen">
			<div v-for="(market, index) in this.$props.markets" :key="market.id">
				<customer-brand-detail-market-card
					:market="market"
					:index="index"
				></customer-brand-detail-market-card>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBrandDetailMarketCard from "./CustomerBrandDetailMarketCard.vue";
	export default {
		setup() {},
		components: { CustomerBrandDetailMarketCard },
		props: ["markets", "brand"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>