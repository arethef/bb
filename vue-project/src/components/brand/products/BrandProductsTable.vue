<template>
	<div>
		<!-- <p>[BrandProductsTable.vue]</p> -->
		<div class="md:container md:mx-auto">
			<table class="min-w-full border text-center">
				<thead class="bg-gray-100">
					<tr class="border-b">
						<th scope="col" class="font-medium px-2 py-2 border-r">#</th>
						<th scope="col" class="font-medium px-2 py-2 border-r">
							상품고유번호
						</th>
						<th scope="col" class="font-medium px-2 py-2 border-r">상품이름</th>
						<th scope="col" class="font-medium px-2 py-2 border-r">상품가격</th>
						<th scope="col" class="font-medium px-2 py-2 border-r">총마켓수</th>
						<th scope="col" class="font-medium px-2 py-2 border-r">총판매수</th>
						<th scope="col" class="font-medium px-2 py-2">
							마지막마켓오픈일시
						</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr
						v-for="(product, index) in this.productStore
							.productAllTableProducts"
						:key="product.product.id"
						@click="moveBrandProductDetailView(product.product.id)"
						class="border-b cursor-pointer"
					>
						<th
							scope="row"
							class="px-2 py-2 whitespace-nowrap font-medium border-r"
						>
							{{ index + 1 }}
						</th>
						<td class="px-2 py-2 whitespace-nowrap font-medium border-r">
							{{ product.product.un }}
						</td>
						<td class="font-light px-2 py-2 whitespace-nowrap border-r">
							{{ product.product.name }}
						</td>
						<td class="font-light px-2 py-2 whitespace-nowrap border-r">
							{{ product.product.price }}
						</td>
						<td class="font-light px-2 py-2 whitespace-nowrap border-r">
							{{ product.totalNumberOfMarkets }}
						</td>
						<td class="font-light px-2 py-2 whitespace-nowrap border-r">
							{{ product.totalNumberOfSales }}
						</td>
						<td class="font-light px-2 py-2 whitespace-nowrap">
							{{ product.openDateTimeOfLastMarket }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "@/stores/brand";
	import { useProductStore } from "@/stores/product";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const productStore = useProductStore();
			return { brandStore, productStore };
		},
		data() {
			return {};
		},
		computed: {},
		async beforeCreate() {
			console.log(`++++++ [BrandProductsTable.vue] beforeCreate() ++++++`);
			const allTableProducts = await this.productStore.loadProducts();
			this.productStore.setAllTableProducts(allTableProducts);
			console.log(
				`❯❯❯❯❯❯ [BrandProductsTable.vue] beforeCreate() allTableProducts:`,
				allTableProducts
			);
		},
		methods: {
			async moveBrandProductDetailView(id) {
				console.log(
					`++++++ [BrandProductsTable.vue] moveBrandProductDetailView() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandProductsTable.vue] moveBrandProductDetailView() id:`,
					id
				);
				await this.productStore.detailProduct(id);
				await this.productStore.setCurrentProductId(id);
				console.log(
					`❯❯❯❯❯❯ [BrandProductsTable.vue] moveBrandProductDetailView() this.productStore.productCurrentProductId:`,
					this.productStore.productCurrentProductId
				);
				console.log(
					`❯❯❯❯❯❯ [BrandProductsTable.vue] moveBrandProductDetailView() this.productStore.productCurrentProduct:`,
					this.productStore.productCurrentProduct
				);
				this.$router.push({
					name: `BrandProductDetail`,
					params: { productId: id },
				});
			},
		},
	};
</script>

<style>
</style>