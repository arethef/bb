<template>
	<div>
		<!-- <p>[CustomerMarketCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid grid-flow-row gap-2">
				<div class="flex justify-center text-sm">
					{{ this.$props.market.brand.businessName }}
				</div>
				<div><img :src="`${this.$props.market.image.url}`" /></div>
				<div class="grid grid-flow-col relative">
					<div class="absolute right-0 top-0">
						<customer-bookmark-heart
							targetEntity="market"
							:targetEntityId="this.$props.market.id"
						></customer-bookmark-heart>
					</div>
				</div>
				<div class="flex justify-center text-sm">
					{{ this.$props.market.title }}
				</div>
				<div class="flex justify-center text-sm">D{{ this.closeDDay }}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {},
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