<template>
	<div class="md:container md:mx-auto">
		<!-- <p>[BrandProductDetailView.vue]</p> -->
		<div class="flex justify-center gap-4">
			<div class="basis-1/4">
				<div class="border mt-4 p-4">
					<div class="grid grid-cols-1 gap-4">
						<label class="block">
							<span class="">상품고유번호</span>
							<input
								type="text"
								class="mt-1 block w-full text-xs"
								placeholder=""
								v-model="this.productStore.productCurrentProduct.un"
								disabled
							/>
						</label>
						<label class="block">
							<span class="">상품이름</span>
							<input
								type="text"
								class="mt-1 block w-full text-xs"
								placeholder=""
								v-model="this.productStore.productCurrentProduct.name"
								disabled
							/>
						</label>
						<label class="block">
							<span class="">상품설명</span>
							<input
								type="text"
								class="mt-1 block w-full text-xs"
								placeholder=""
								v-model="this.productStore.productCurrentProduct.description"
								disabled
							/>
						</label>
						<label class="block">
							<span class="">상품가격</span>
							<input
								type="text"
								class="mt-1 block w-full text-xs"
								placeholder=""
								v-model="this.productStore.productCurrentProduct.price"
								disabled
							/>
						</label>
						<label class="block">
							<span class="">상품사진</span>
							<div>
								<img
									:src="`${this.productStore.productCurrentProduct.image.url}`"
								/>
							</div>
						</label>
					</div>
				</div>
			</div>
			<div class="basis-3/4">
				<div class="border mt-4 p-4">
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