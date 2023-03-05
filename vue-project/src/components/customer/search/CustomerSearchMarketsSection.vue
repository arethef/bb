<template>
	<div>
		<!-- <p>[CustomerSearchMarketsSection.vue]</p> -->
		<div class="">마켓 검색 결과</div>
		<div class="border mt-4 mb-8"></div>
		<div v-if="this.$props.markets.length > 0" class="grid grid-cols-4 gap-4">
			<div v-for="market in this.$props.markets" :key="market.id">
				<customer-market-card :market="market"></customer-market-card>
			</div>
		</div>
		<div v-else>
			<div class="flex justify-center">
				<div>검색 문구에 해당하는 마켓이 없습니다.</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerMarketCard from "../markets/CustomerMarketCard.vue";
	export default {
		setup() {},
		components: { CustomerMarketCard },
		props: ["markets"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>