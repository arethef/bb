<template>
	<div>
		<!-- <p>[CustomerMarketLatestSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid md:grid-cols-4 gap-4">
				<div
					v-for="(market, index) in this.marketStore
						.marketCustomerAllCardsMarketsLatest"
					:key="market.market.id"
					class="cursor-pointer"
					@click="moveCustomerMarketDetailView(market.market.id)"
				>
					<customer-market-card
						:market="market.market"
						:index="index"
					></customer-market-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import CustomerMarketCard from "./CustomerMarketCard.vue";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			return { marketStore, lineupStore };
		},
		components: { CustomerMarketCard },
		data() {
			return {};
		},
		async beforeCreate() {
			console.log(
				`++++++ [CustomerMarketLatestSection.vue] beforeCreate() ++++++`
			);
			const customerAllCardsMarketsLatest =
				await this.marketStore.loadCustomerAllCardsMarketsLatest();
			console.log(
				`❯❯❯❯❯❯ [CustomerMarketLatestSection.vue] beforeCreate() customerAllCardsMarketsLatest:`,
				customerAllCardsMarketsLatest
			);
			this.marketStore.setCustomerAllCardsMarketsLatest(
				customerAllCardsMarketsLatest
			);
			console.log(
				`❯❯❯❯❯❯ [CustomerMarketLatestSection.vue] beforeCreate() this.marketStore.marketCustomerAllCardsMarketsLatest:`,
				this.marketStore.marketCustomerAllCardsMarketsLatest
			);
		},
		created() {},
		methods: {
			async moveCustomerMarketDetailView(id) {
				console.log(
					`++++++ [CustomerMarketLatestSection.vue] moveCustomerMarketDetailView() ++++++`
				);
				await this.marketStore.detailMarket(id);
				this.marketStore.setCurrentMarketId(id);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketLatestSection.vue] beforeCreate() moveCustomerMarketDetailView() this.marketStore.marketCurrentMarket:`,
					this.marketStore.marketCurrentMarket
				);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketLatestSection.vue] beforeCreate() moveCustomerMarketDetailView() this.marketStore.marketCurrentMarketId:`,
					this.marketStore.marketCurrentMarketId
				);
				await this.lineupStore.loadLineups(id);
				this.$router.push({
					name: `CustomerMarketDetail`,
					params: { marketId: id },
				});
			},
		},
	};
</script>

<style>
</style>