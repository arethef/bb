<template>
	<div class="mt-1">
		<!-- <p>[BrandMarketNewProductsTable.vue]</p> -->
		<table class="min-w-full border text-center">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="px-2 py-2 border-r"></th>
					<th scope="col" class="px-2 py-2 border-r">#</th>
					<th scope="col" class="px-2 py-2 border-r">상품이름</th>
					<th scope="col" class="px-2 py-2 border-r">상품사진</th>
					<th scope="col" class="px-2 py-2 border-r">상품가격</th>
					<th scope="col" class="px-2 py-2 border-r">수량</th>
				</tr>
			</thead>
			<tbody class="bg-white">
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
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</th>
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ product.product.name }}
					</th>
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						<img :src="`${product.product.image.url}`" class="h-16" />
					</th>
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ product.product.price }}
					</th>
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						<input
							type="number"
							:id="`${product.product.id}`"
							class="text-xs w-16"
							value="0"
							@change="onChangeLineupProductQuantity(product.product.id)"
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
				lineups: {},
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
			async onChangeLineupProductQuantity(productId) {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] onChangeLineupProductQuantity() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLineupProductQuantity() productId:`,
					productId
				);
				this.lineups[productId] = document.getElementById(productId).value;
				if (this.lineups[productId] <= 0) {
					delete this.lineups[productId];
					if (this.productIds.includes(productId)) {
						this.productIds.splice(this.productIds.indexOf(productId), 1);
					}
				} else {
					if (!this.productIds.includes(productId)) {
						this.productIds.push(productId);
					}
				}
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLineupProductQuantity() this.lineups:`,
					this.lineups
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLineupProductQuantity() this.productIds:`,
					this.productIds
				);
				await this.loadLineups();
				this.$emit("brandMarketNewLineups", this.lineups);
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
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] onChangeLineupProductQuantity() this.lineups:`,
					this.lineups
				);
				await this.loadLineups();
				this.$emit("brandMarketNewLineups", this.lineups);
			},
			async loadLineups() {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] loadLineups() ++++++`
				);
				const marketNewLineups = await this.productStore.loadMarketNewLineups(
					this.lineups
				);
				this.productStore.setBrandMarketNewLineups(marketNewLineups);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] loadLineups() this.productStore.productBrandMarketNewLineups:`,
					this.productStore.productBrandMarketNewLineups
				);
			},
		},
	};
</script>

<style>
</style>