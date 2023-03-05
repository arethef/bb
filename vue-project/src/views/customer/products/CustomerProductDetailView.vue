<template>
	<div>
		<!-- <p>[CustomerProductDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-3">
					<div class="border p-4 grid gap-4">
						<div class="flex flex-col justify-center">
							<div class="text-base font-bold text-center">
								{{ this.productStore.productCurrentProduct.brand.businessName }}
							</div>
							<div class="my-1">
								<div class="my-2">
									<div class="grid grid-cols-3">
										<div class="col-span-1"></div>
										<div class="col-span-1">
											<img
												:src="`${this.productStore.productCurrentProduct.brand.user.image.url}`"
											/>
										</div>
										<div class="col-span-1"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="font-bold">
							{{ this.productStore.productCurrentProduct.name }}
						</div>
						<div>
							<img
								:src="`${this.productStore.productCurrentProduct.image.url}`"
							/>
						</div>
						<div>
							{{ this.productStore.productCurrentProduct.description }}
						</div>
					</div>
				</div>
				<div class="col-span-9">
					<div>
						<customer-product-detail-markets-section
							:product="this.productStore.productCurrentProduct"
							:productId="this.$props.productId"
						></customer-product-detail-markets-section>
						<!-- <customer-market-detail-lineups-table
							:marketId="this.$props.marketId"
						></customer-market-detail-lineups-table> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerProductDetailMarketsSection from "../../../components/customer/products/CustomerProductDetailMarketsSection.vue";
	import { useProductStore } from "../../../stores/product";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		components: { CustomerProductDetailMarketsSection },
		props: ["productId"],
		data() {
			return {};
		},
		async beforeCreate() {
			await this.productStore.detailProduct(this.$props.productId);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>