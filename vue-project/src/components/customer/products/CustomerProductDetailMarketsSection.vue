<template>
	<div>
		<!-- <p>[CustomerProductDetailMarketsSection.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-4">
				<div class="flex justify-center">
					{{ this.$props.product.name }}이 판매되었던 마켓 목록
				</div>
				<div class="grid gap-4">
					<div
						v-for="market in this.marketStore.customerProductDetailMarkets"
						:key="market.id"
					>
						<customer-product-detail-market-card
							:market="market"
						></customer-product-detail-market-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	import CustomerProductDetailMarketCard from "./CustomerProductDetailMarketCard.vue";
	export default {
		setup() {
			const productStore = useProductStore();
			const marketStore = useMarketStore();
			return { productStore, marketStore };
		},
		components: { CustomerProductDetailMarketCard },
		props: ["product", "productId"],
		data() {
			return {};
		},
		async beforeCreate() {
			await this.marketStore.loadCustomerProductDetailMarkets(
				this.$props.productId
			);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>