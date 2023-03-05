<template>
	<div>
		<!-- <p>[CustomerProductDetailMarketCard.vue]</p> -->
		<div class="border p-4">
			<!-- {{ this.$props.market }} -->
			<div class="grid grid-cols-12 gap-4 relative">
				<div class="absolute right-0 top-0">
					<customer-bookmark-heart
						targetEntity="market"
						:targetEntityId="this.$props.market.id"
					></customer-bookmark-heart>
				</div>
				<div class="col-span-3">
					<img
						:src="`${this.$props.market.image.url}`"
						style="height: 160px; width: 160px"
						class="cursor-pointer"
						@click="moveCustomerMarketDetailView(this.$props.market.id)"
					/>
				</div>
				<div class="col-span-9">
					<div class="flex flex-col gap-1.5">
						<div
							class="cursor-pointer"
							@click="moveCustomerMarketDetailView(this.$props.market.id)"
						>
							<span class="text-lg font-bold">{{
								this.$props.market.title
							}}</span>
						</div>
						<div class="">{{ this.$props.market.content }}</div>
						<div class="">{{ this.$props.market.pro }}</div>
						<div class="">
							<span
								v-for="(lineup, index) in this.lineupStore.lineupCurrentLineups"
								:key="lineup.id"
								>{{
									Number(index + 1) ===
									this.lineupStore.lineupCurrentLineups.length
										? lineup.product.name
										: lineup.product.name + " | "
								}}
							</span>
						</div>
						<div class="">
							Open
							<!-- {{ this.$props.market.openDateTime }} -->
							{{ open.getFullYear() }}년{{ open.getMonth() + 1 }}월{{
								open.getDate()
							}}일 {{ open.getHours() }}시{{ open.getMinutes() }}분{{
								open.getSeconds()
							}}초
						</div>
						<div class="">
							Close
							<!-- {{ this.$props.market.closeDateTime }} -->
							{{ close.getFullYear() }}년{{ close.getMonth() + 1 }}월{{
								close.getDate()
							}}일 {{ close.getHours() }}시{{ close.getMinutes() }}분{{
								close.getSeconds()
							}}초
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			return { marketStore, lineupStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["market"],
		computed: {
			open() {
				return new Date(this.$props.market.openDateTime);
			},
			close() {
				return new Date(this.$props.market.closeDateTime);
			},
		},
		data() {
			return {};
		},
		async beforeCreate() {
			await this.lineupStore.loadLineups(this.$props.market.id);
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