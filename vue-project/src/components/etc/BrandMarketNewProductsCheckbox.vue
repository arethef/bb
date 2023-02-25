<template>
	<div class="grid grid-cols-4 gap-4">
		<!-- <p>[BrandMarketNewProductsTable.vue]</p> -->
		<div
			v-for="(product, index) in this.productStore
				.productBrandMarketNewProducts"
			:key="product.product.id"
			class="block"
		>
			<label
				:for="`${product.product.id}`"
				class="hover:cursor-pointer"
				@change="checkMarketNewProducts()"
			>
				<input
					:id="`${product.product.id}`"
					type="checkbox"
					v-model="productIds"
					:value="`${product.product.id}`"
				/>
				{{ index + 1 }}
				{{ product.product.name }}
				<div class="mt-1">
					<img :src="`${product.product.image.url}`" />
				</div>
			</label>
		</div>
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
			checkMarketNewProducts() {
				console.log(
					`++++++ [BrandMarketNewProductsTable.vue] checkMarketNewProducts() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewProductsTable.vue] checkMarketNewProducts() this.productIds:`,
					this.productIds
				);
				this.$emit("brandMarketNewProductIds", this.productIds);
			},
		},
	};
</script>

<style>
</style>