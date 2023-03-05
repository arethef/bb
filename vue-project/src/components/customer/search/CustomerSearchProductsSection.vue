<template>
	<div>
		<!-- <p>[CustomerSearchProductsSection.vue]</p> -->
		<div class="">상품 검색 결과</div>
		<div class="border mt-4 mb-8"></div>
		<div v-if="this.$props.products.length > 0" class="grid grid-cols-4 gap-4">
			<div v-for="product in this.$props.products" :key="product.id">
				<customer-product-card :product="product"></customer-product-card>
			</div>
		</div>
		<div v-else>
			<div class="flex justify-center">
				<div>검색 문구에 해당하는 상품이 없습니다.</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerProductCard from "../products/CustomerProductCard.vue";
	export default {
		setup() {},
		components: { CustomerProductCard },
		props: ["products"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>