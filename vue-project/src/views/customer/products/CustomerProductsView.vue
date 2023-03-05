<template>
	<div>
		<div class="md:container md:mx-auto"></div>
		<!-- <p>[CustomerProductsView.vue]</p> -->
		<customer-products-latest-section></customer-products-latest-section>
	</div>
</template>

<script>
	import CustomerProductsLatestSection from "../../../components/customer/products/CustomerProductsLatestSection.vue";
	import { useProductStore } from "../../../stores/product";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		components: { CustomerProductsLatestSection },
		data() {
			return {};
		},
		async beforeCreate() {
			await this.productStore.loadCustomerProducts();
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>