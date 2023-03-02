<template>
	<div>
		<!-- <p>[CustomerBrandAscSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid md:grid-cols-4 gap-4">
				<div
					v-for="(brand, index) in this.brandStore
						.brandCustomerAllCardsBrandsAsc"
					:key="brand.id"
				>
					<customer-brand-card
						:brand="brand"
						:index="index"
					></customer-brand-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	import CustomerBrandCard from "./CustomerBrandCard.vue";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const marketStore = useMarketStore();
			const productStore = useProductStore();
			return { brandStore, marketStore, productStore };
		},
		components: { CustomerBrandCard },
		data() {
			return {};
		},
		async beforeCreate() {
			const customerAllCardsBrandsAsc =
				await this.brandStore.loadCustomerAllCardsBrandsAsc();
			this.brandStore.setCustomerAllCardsBrandsAsc(customerAllCardsBrandsAsc);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>