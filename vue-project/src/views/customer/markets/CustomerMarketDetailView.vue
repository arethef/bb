<template>
	<div>
		<!-- <p>[CustomerMarketDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-3">
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
				<div class="col-span-9">
					<div>
						<customer-market-detail-lineups-table
							:marketId="this.$props.marketId"
						></customer-market-detail-lineups-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerMarketDetailLineupsTable from "../../../components/customer/markets/CustomerMarketDetailLineupsTable.vue";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			return { marketStore, lineupStore };
		},
		components: {
			CustomerMarketDetailLineupsTable,
		},
		props: ["marketId"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>