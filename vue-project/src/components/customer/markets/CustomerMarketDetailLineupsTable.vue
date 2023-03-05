<template>
	<div>
		<div class="border p-4">
			<!-- <p>[CustomerMarketDetailLineupsTable.vue]</p> -->
			<table class="min-w-full border text-center">
				<thead class="bg-gray-100">
					<tr class="border-b">
						<th scope="col" class="px-2 py-2 border-r"></th>
						<th scope="col" class="px-2 py-2 border-r">#</th>
						<th scope="col" class="px-2 py-2 border-r">상품이름</th>
						<th scope="col" class="px-2 py-2 border-r">상품사진</th>
						<th scope="col" class="px-2 py-2 border-r">상품가격</th>
						<th scope="col" class="px-2 py-2 border-r">준비수량</th>
						<th scope="col" class="px-2 py-2 border">주문수량</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr
						v-for="(lineup, index) in this.lineupStore.lineupCurrentLineups"
						:key="lineup.product.id"
						class="border-b"
					>
						<td scope="row" class="whitespace-nowrap border-r">
							<input
								type="checkbox"
								v-model="productIds"
								:value="`${lineup.product.id}`"
								@change="checkTicketNewProducts()"
							/>
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							{{ index + 1 }}
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							{{ lineup.product.name }}
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							<div class="flex justify-center">
								<img
									:src="`${lineup.product.image.url}`"
									style="max-width: 100px"
									alt=""
								/>
							</div>
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							{{ lineup.product.price }}
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							{{ lineup.quantity }}
						</td>
						<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							<input
								type="number"
								:id="`${lineup.product.id}`"
								class="text-xs w-16"
								value="0"
								@change="onChangeOrderProductQuantity(lineup.product.id)"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="p-4">
			<customer-market-detail-ticket-new-modal
				:orders="this.orders"
				:marketId="this.$props.marketId"
			></customer-market-detail-ticket-new-modal>
		</div>
	</div>
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	import CustomerMarketDetailTicketNewModal from "./CustomerMarketDetailTicketNewModal.vue";
	export default {
		setup() {
			const lineupStore = useLineupStore();
			const productStore = useProductStore();
			const marketStore = useMarketStore();
			return { lineupStore, productStore, marketStore };
		},
		components: { CustomerMarketDetailTicketNewModal },
		props: ["marketId"],
		data() {
			return {
				productIds: [],
				orders: {},
			};
		},
		computed: {},
		beforeCreate() {
			this.marketStore.detailMarket(this.$props.marketId);
			this.lineupStore.loadLineups(this.$props.marketId);
		},
		methods: {
			async onChangeOrderProductQuantity(productId) {
				console.log(
					`++++++ [CustomerMarketDetailLinupsTable.vue] onChangeOrderProductQuantity() ++++++`
				);
				this.orders[productId] = document.getElementById(productId).value;
				if (this.orders[productId] <= 0) {
					delete this.orders[productId];
					if (this.productIds.includes(productId)) {
						this.productIds.splice(this.productIds.indexOf(productId), 1);
					}
				} else {
					if (!this.productIds.includes(productId)) {
						this.productIds.push(productId);
					}
				}
				await this.loadOrders();
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketDetailLinupsTable.vue] onChangeOrderProductQuantity() this.orders:`,
					this.orders,
					`this.totalQuantity:`,
					this.totalQuantity,
					`this.totalPrice:`,
					this.totalPrice
				);
			},
			async checkTicketNewProducts() {
				await this.loadOrders();
			},
			async loadOrders() {
				const ticketNewOrders = await this.productStore.loadTicketNewOrders(
					this.orders
				);
				this.productStore.setCustomerTicketNewOrders(ticketNewOrders);
			},
		},
	};
</script>

<style>
</style>