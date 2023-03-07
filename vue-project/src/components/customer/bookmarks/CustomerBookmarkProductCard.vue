<template>
	<div>
		<!-- <p>[CustomerBookmarkProductCard.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-4">
				<div
					class="flex justify-center cursor-pointer font-bold"
					@click="
						moveCustomerProductDetailView(
							this.$props.bookmarkProduct.product.id
						)
					"
				>
					<!-- {{ this.$props.bookmarkProduct.product.brand.businessName }} -->
					{{ this.$props.bookmarkProduct.product.name }}
				</div>
				<div>
					<img
						:src="`${this.$props.bookmarkProduct.product.image.url}`"
						@click="
							moveCustomerProductDetailView(
								this.$props.bookmarkProduct.product.id
							)
						"
					/>
				</div>
				<div class="text-xs relative grid grid-cols-6">
					<div class="col-span-5 text-xs">
						{{ this.$props.bookmarkProduct.product.brand.businessName }}
					</div>
					<div class="absolute right-0 top-0">
						<customer-bookmark-heart
							targetEntity="product"
							:targetEntityId="this.$props.bookmarkProduct.product.id"
						></customer-bookmark-heart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useProductStore } from "../../../stores/product";
	import CustomerBookmarkHeart from "./CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["bookmarkProduct"],
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