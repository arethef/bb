<template>
	<div>
		<!-- <p>[CustomerMarketCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid grid-flow-row gap-4">
				<div
					class="flex justify-center cursor-pointer font-bold"
					@click="moveCustomerMarketDetailView(this.$props.market.id)"
				>
					{{ this.$props.market.title }}
				</div>
				<div>
					<img
						:src="`${this.$props.market.image.url}`"
						@click="moveCustomerMarketDetailView(this.$props.market.id)"
						class="cursor-pointer"
					/>
				</div>
				<div class="grid grid-cols-6 relative">
					<div class="col-span-5 text-xs">
						{{ this.$props.market.brand.businessName }}
					</div>
					<div class="absolute right-0">
						<customer-bookmark-heart
							targetEntity="market"
							:targetEntityId="this.$props.market.id"
						></customer-bookmark-heart>
					</div>
				</div>
				<div class="flex justify-start">D{{ this.closeDDay }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			const brandStore = useBrandStore();
			const productStore = useProductStore();
			return { marketStore, lineupStore, brandStore, productStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["market"],
		data() {
			return {
				closeDDay: "",
			};
		},
		computed: {},
		created() {},
		mounted() {
			this.dDay();
			setInterval(this.dDay.bind(this), 1000);
		},
		methods: {
			async moveCustomerMarketDetailView(id) {
				console.log(
					`++++++ [CustomerMarketCard.vue] moveCustomerMarketDetailView() ++++++`
				);
				await this.marketStore.detailMarket(id);
				this.marketStore.setCurrentMarketId(id);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketCard.vue] beforeCreate() moveCustomerMarketDetailView() this.marketStore.marketCurrentMarket:`,
					this.marketStore.marketCurrentMarket
				);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketCard.vue] beforeCreate() moveCustomerMarketDetailView() this.marketStore.marketCurrentMarketId:`,
					this.marketStore.marketCurrentMarketId
				);
				await this.lineupStore.loadLineups(id);
				this.$router.push({
					name: `CustomerMarketDetail`,
					params: { marketId: id },
				});
			},
			dDay() {
				const now = new Date(Date.now());
				const close = new Date(this.$props.market.closeDateTime);
				// const diff = new Date(close - now);
				let diff = 0;
				if (close > now) {
					diff = Number(close) - Number(now);
				} else {
					diff = Number(now) - Number(close);
				}

				const h = Math.floor(diff / (60 * 60 * 1000));
				const m = Math.floor((diff - h * (60 * 60 * 1000)) / (60 * 1000));
				const s = Math.floor(((diff - h * (60 * 60 * 1000)) / 1000) % 60);
				// const h = diff.getHours();
				// const m = diff.getMinutes();
				// const s = diff.getSeconds();

				// this.closeDDay = diff;
				if (close > now) {
					this.closeDDay = `-${h}시간${m}분${s}초`;
				} else {
					this.closeDDay = `+${h}시간${m}분${s}초`;
				}
				// this.closeDDay =
				// 	diff >= 0 ? `-${h}시간${m}분${s}초` : `+${-h}시간${-m}분${-s}초`;
			},
		},
	};
</script>

<style>
</style>