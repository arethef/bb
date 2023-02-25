<template>
	<div>
		<p>[BrandProductsView.vue]</p>

		<brand-product-new-modal></brand-product-new-modal>
		<brand-products-table></brand-products-table>
	</div>
</template>

<script>
	import BrandProductNewModal from "../../../components/brand/products/BrandProductNewModal.vue";
	import BrandProductsTable from "../../../components/brand/products/BrandProductsTable.vue";
	export default {
		components: { BrandProductNewModal, BrandProductsTable },
		setup() {},
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>