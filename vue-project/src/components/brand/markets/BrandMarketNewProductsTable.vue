<template>
	<div class="mt-1">
		<!-- <p>[BrandMarketNewProductsTable.vue]</p> -->
		<table class="min-w-full border text-center">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="px-2 border-r"></th>
					<th scope="col" class="px-2 border-r">#</th>
					<th scope="col" class="px-2 border-r">상품이름</th>
					<th scope="col" class="px-2 border-r">상품사진</th>
					<th scope="col" class="px-2 border-r">상품가격</th>
					<th scope="col" class="px-2 border-r">수량</th>
				</tr>
			</thead>
			<tbody class="bg-white text-xs">
				<tr
					v-for="(product, index) in this.productStore
						.productBrandMarketNewProducts"
					:key="product.product.id"
					class="border-b"
				>
					<td scope="row" class="whitespace-nowrap border-r">
						<input
							type="checkbox"
							v-model="productIds"
							:value="`${product.product.id}`"
							@change="checkMarketNewProducts()"
						/>
					</td>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</th>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						{{ product.product.name }}
					</th>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						<img :src="`${product.product.image.url}`" class="h-16" />
					</th>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						{{ product.product.price }}
					</th>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						<input
							type="number"
							:id="`${product.product.id}`"
							class="w-16"
							value="0"
							@change="onChangeLinupProductQuantity(product.product.id)"
						/>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { useProductStore } from "../../../stores/product";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		data() {
			return {
				productIds: [],
				lineup: {},
			};
		},
		computed: {},
		async beforeCreate() {
			console.log(
				`++++++ [BrandMarketNewProductsTable.vue] beforeCreated() ++++++`
			);
			const brandMarketNewProducts =
				await this.productStore.loadMarketNewProducts();
			this.productStore.setBrandMarketNewProducts(brandMarketNewProducts);
			console.log(
				`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] beforeCreated() brandMarketNewProducts:`,
				brandMarketNewProducts
			);
		},
		created() {
			console.log(`++++++ [BrandMarketNewProductsTable.vue] created() ++++++`);
		},
		methods: {
			async onChangeLinupProductQuantity(productId) {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] onChangeLinupProductQuantity() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLinupProductQuantity() productId:`,
					productId
				);
				this.lineup[productId] = document.getElementById(productId).value;
				if (this.lineup[productId] <= 0) {
					delete this.lineup[productId];
					if (this.productIds.includes(productId)) {
						this.productIds.splice(this.productIds.indexOf(productId), 1);
					}
				} else {
					if (!this.productIds.includes(productId)) {
						this.productIds.push(productId);
					}
				}
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLinupProductQuantity() this.lineup:`,
					this.lineup
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLinupProductQuantity() this.productIds:`,
					this.productIds
				);
				await this.loadLineup();
				this.$emit("brandMarketNewLineup", this.lineup);
			},
			async checkMarketNewProducts() {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] checkMarketNewProducts() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] checkMarketNewProducts() this.productIds:`,
					this.productIds
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLinupProductQuantity() this.lineup:`,
					this.lineup
				);
				await this.loadLineup();
				this.$emit("brandMarketNewLineup", this.lineup);
			},
			async loadLineup() {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] loadLineup() ++++++`
				);
				const marketNewLineup = await this.productStore.loadMarketNewLineup(
					this.lineup
				);
				this.productStore.setBrandMarketNewLineup(marketNewLineup);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] loadLineup() this.productStore.productBrandMarketNewLineup:`,
					this.productStore.productBrandMarketNewLineup
				);
			},
		},
	};
</script>

<style>
</style>