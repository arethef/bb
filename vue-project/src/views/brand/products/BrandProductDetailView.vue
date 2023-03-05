<template>
	<div class="md:container md:mx-auto">
		<!-- <p>[BrandProductDetailView.vue]</p> -->
		<div class="grid grid-cols-12 gap-4">
			<div class="col-span-3">
				<div class="border p-4 grid gap-4">
					<label for="un" class="block">
						<span>상품번호</span>
						<div class="border-2 my-1 bg-white">
							<div class="text-xs m-2">
								{{ this.productStore.productCurrentProduct.un }}
							</div>
						</div>
					</label>
					<label for="name" class="block">
						<span>상품이름</span>
						<div class="border-2 my-1 bg-white">
							<div class="text-xs m-2">
								{{ this.productStore.productCurrentProduct.name }}
							</div>
						</div>
					</label>
					<label for="description" class="block">
						<span>상품설명</span>
						<div class="border-2 my-1 bg-white">
							<div class="text-xs m-2">
								{{ this.productStore.productCurrentProduct.description }}
							</div>
						</div>
					</label>
					<label for="price" class="block">
						<span>상품가격</span>
						<div class="border-2 my-1 bg-white">
							<div class="text-xs m-2">
								{{ this.productStore.productCurrentProduct.price }}
							</div>
						</div>
					</label>
					<label for="image" class="block">
						<span>상품사진</span>
						<div class="">
							<div class="my-2">
								<img
									:src="`${this.productStore.productCurrentProduct.image.url}`"
								/>
							</div>
						</div>
					</label>
				</div>
			</div>
			<div class="col-span-9">
				<div class="border p-4">
					<brand-product-detail-markets-table
						:productId="this.$props.productId"
					></brand-product-detail-markets-table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useProductStore } from "@/stores/product";
	import { useImageStore } from "@/stores/image";
	import BrandProductDetailMarketsTable from "@/components/brand/products/BrandProductDetailMarketsTable.vue";

	export default {
		setup() {
			console.log(`++++++ [BrandProductDetailView.vue] setup() ++++++`);
			const productStore = useProductStore();
			const imageStore = useImageStore();
			return { productStore, imageStore };
		},
		props: ["productId"],
		components: { BrandProductDetailMarketsTable },
		data() {
			return {};
		},
		async beforeCreate() {
			await this.productStore.detailProduct(this.$props.productId);
		},
		// created() {
		//   this.productStore.detailProduct(this.$props.productId);
		// },
		methods: {},
	};
</script>

<style>
</style>