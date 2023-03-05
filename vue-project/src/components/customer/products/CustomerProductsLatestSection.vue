<template>
	<div>
		<!-- <p>[CustomerProductsLatestSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-4 gap-4">
				<div
					v-for="product in this.productStore.productCustomerProducts"
					:key="product.id"
				>
					<customer-product-card :product="product"></customer-product-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useProductStore } from "../../../stores/product";
	import CustomerProductCard from "./CustomerProductCard.vue";
	export default {
		setup() {
			const productStore = useProductStore();
			return { productStore };
		},
		components: { CustomerProductCard },
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>