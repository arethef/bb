<template>
	<div>
		<!-- <p>[CustomerBookmarkMarketCard.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-2">
				<div
					class="flex justify-center cursor-pointer"
					@click="
						moveCustomerMarketDetailView(
							this.$props.bookmarkMarket.target.market.id
						)
					"
				>
					{{ this.$props.bookmarkMarket.target.market.title }}
				</div>
				<div>
					<img
						:src="`${this.$props.bookmarkMarket.target.market.image.url}`"
						class="cursor-pointer"
						@click="
							moveCustomerMarketDetailView(
								this.$props.bookmarkMarket.target.market.id
							)
						"
					/>
				</div>
				<div class="text-xs relative">
					<div class="p-0.5"></div>
					{{ this.$props.bookmarkMarket.target.market.brand.businessName }}
					<div class="absolute right-0 top-0">
						<customer-bookmark-heart
							targetEntity="market"
							:targetEntityId="this.$props.bookmarkMarket.target.market.id"
						></customer-bookmark-heart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import CustomerBookmarkHeart from "./CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			return { marketStore, lineupStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["bookmarkMarket"],
		data() {
			return {};
		},
		created() {},
		methods: {
			async moveCustomerMarketDetailView(id) {
				await this.marketStore.detailMarket(id);
				this.marketStore.setCurrentMarketId(id);
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