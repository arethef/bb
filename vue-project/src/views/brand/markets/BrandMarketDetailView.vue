<template>
	<div>
		<!-- <p>[BrandMarketDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-2">
					<div class="border p-4">
						<label for="title" class="block">
							<span>Title</span>
							<input
								type="text"
								name="title"
								id="title"
								v-model="this.marketStore.marketCurrentMarket.title"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="content" class="block mt-4">
							<span>Content</span>
							<input
								type="text"
								name="content"
								id="content"
								v-model="this.marketStore.marketCurrentMarket.content"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="image" class="block mt-4">
							<span>Image</span>
							<div>
								<img
									:src="`${this.marketStore.marketCurrentMarket.image.url}`"
								/>
							</div>
						</label>
						<label for="deliveryFee" class="block mt-4">
							<span>Delivery Fee</span>
							<input
								type="text"
								name="deliveryFee"
								id="deliveryFee"
								v-model="this.marketStore.marketCurrentMarket.deliveryFee"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="deliveryFeeAdded" class="block mt-4">
							<span>Delivery Fee Added</span>
							<input
								type="text"
								name="deliveryFeeAdded"
								id="deliveryFeeAdded"
								v-model="this.marketStore.marketCurrentMarket.deliveryFeeAdded"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="deliveryFree" class="block mt-4">
							<span>Delivery Free</span>
							<input
								type="text"
								name="deliveryFree"
								id="deliveryFree"
								v-model="this.marketStore.marketCurrentMarket.deliveryFree"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="minimumQuaytity" class="block mt-4">
							<span>Minimum Quantity</span>
							<input
								type="text"
								name="minimumQuaytity"
								id="minimumQuaytity"
								v-model="this.marketStore.marketCurrentMarket.minimumQuaytity"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="openDateTime" class="block">
							<span>Open Date Time</span>
							<input
								type="text"
								name="openDateTime"
								id="openDateTime"
								v-model="this.marketStore.marketCurrentMarket.openDateTime"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
						<label for="closeDateTime" class="block">
							<span>Close Date Time</span>
							<input
								type="text"
								name="closeDateTime"
								id="closeDateTime"
								v-model="this.marketStore.marketCurrentMarket.closeDateTime"
								class="text-xs block w-full px-0.5 border-0 border-b-2 bg-inherit border-gray-200"
								disabled
							/>
						</label>
					</div>
				</div>
				<div class="col-span-4">
					<div class="border p-4">
						<brand-market-detail-lineups-table
							:marketId="this.$props.marketId"
						></brand-market-detail-lineups-table>
					</div>
				</div>
				<div class="col-span-6">
					<div class="border p-4">
						<brand-market-detail-orders-table
							:marketId="this.$props.marketId"
						></brand-market-detail-orders-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BrandMarketDetailLineupsTable from "../../../components/brand/markets/BrandMarketDetailLineupsTable.vue";
	import BrandMarketDetailOrdersTable from "../../../components/brand/markets/BrandMarketDetailOrdersTable.vue";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import { useTicketStore } from "../../../stores/ticket";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			const ticketStore = useTicketStore();
			return { marketStore, lineupStore, ticketStore };
		},
		components: { BrandMarketDetailLineupsTable, BrandMarketDetailOrdersTable },
		props: ["marketId"],
		data() {
			return {};
		},
		beforeCreate() {
			this.marketStore.detailMarket(this.$props.marketId);
			this.lineupStore.loadLineups(this.$props.marketId);
			this.ticketStore.loadBrandMarketDetailTickets(this.$props.marketId);
		},
		methods: {},
	};
</script>

<style>
</style>