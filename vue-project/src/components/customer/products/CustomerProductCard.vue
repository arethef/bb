<template>
	<div>
		<!-- <p>[CustomerProductCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid grid-flow-row gap-4">
				<div
					class="flex justify-center cursor-pointer font-bold"
					@click="moveCustomerProductDetailView(this.$props.product.id)"
				>
					{{ this.$props.product.name }}
				</div>
				<div>
					<img
						:src="`${this.$props.product.image.url}`"
						@click="moveCustomerProductDetailView(this.$props.product.id)"
						class="cursor-pointer"
					/>
				</div>
				<div class="grid grid-cols-6 relative">
					<div class="col-span-5 text-xs">
						{{ this.$props.product.brand.businessName }}
					</div>
					<div class="absolute right-0">
						<customer-bookmark-heart
							targetEntity="product"
							:targetEntityId="this.$props.product.id"
						></customer-bookmark-heart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useProductStore } from "../../../stores/product";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["product"],
		data() {
			return {};
		},
		created() {},
		methods: {
			async moveCustomerProductDetailView(id) {
				console.log(
					`++++++ [CustomerProductCard.vue] moveCustomerProductDetailView() ++++++`
				);
				await this.productStore.detailProduct(id);
				this.productStore.setCurrentProductId(id);
				console.log(
					`❯❯❯❯❯❯ [CustomerProductCard.vue] beforeCreate() moveCustomerProductDetailView() this.productStore.productCurrentProduct:`,
					this.productStore.productCurrentProduct
				);
				this.$router.push({
					name: `CustomerProductDetail`,
					params: { productId: id },
				});
			},
		},
	};
</script>

<style>
</style>