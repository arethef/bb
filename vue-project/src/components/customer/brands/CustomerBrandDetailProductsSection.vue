<template>
	<div>
		<!-- <p>[CustomerBrandDetailProductsSection.vue]</p> -->
		<!-- {{ this.$props.products }} -->
		<div class="flex flex-col gap-4 overflow-y-auto h-screen">
			<div v-for="(product, index) in this.$props.products" :key="product.id">
				<customer-brand-detail-product-card
					:product="product"
					:index="index"
				></customer-brand-detail-product-card>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBrandDetailProductCard from "./CustomerBrandDetailProductCard.vue";
	export default {
		setup() {},
		components: { CustomerBrandDetailProductCard },
		props: ["products", "brand"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>