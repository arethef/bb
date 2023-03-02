<template>
	<div>
		<!-- <p>[CustomerBrandDetailMarketCard.vue]</p> -->
		<div class="border p-4">
			<!-- {{ this.$props.market }} -->
			<div class="flex flex-row gap-4 relative">
				<div class="absolute right-0 top-0">
					<customer-bookmark-heart
						targetEntity="market"
						:targetEntityId="this.$props.market.id"
					></customer-bookmark-heart>
				</div>
				<div class="">
					<img
						:src="`${this.$props.market.image.url}`"
						style="height: 160px; width: 160px"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<div class="">
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
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const lineupStore = useLineupStore();
			return { lineupStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["market"],
		data() {
			return {};
		},
		computed: {
			open() {
				return new Date(this.$props.market.openDateTime);
			},
			close() {
				return new Date(this.$props.market.closeDateTime);
			},
		},
		async beforeCreate() {
			await this.lineupStore.loadLineups(this.$props.market.id);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>