<template>
	<div>
		<!-- <p>[CustomerBrandCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid gird-flow-row gap-4 relative">
				<div class="absolute right-0 top-0">
					<customer-bookmark-heart
						targetEntity="brand"
						:targetEntityId="this.$props.brand.id"
					></customer-bookmark-heart>
				</div>
				<div
					class="cursor-pointer"
					@click="moveCustomerBrandDetailView(this.$props.brand.id)"
				>
					{{ this.$props.brand.businessName }}
				</div>
				<div class="">
					<img
						:src="`${this.$props.brand.user.image.url}`"
						class="cursor-pointer"
						@click="moveCustomerBrandDetailView(this.$props.brand.id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const marketStore = useMarketStore();
			const productStore = useProductStore();
			return { brandStore, marketStore, productStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["brand"],
		data() {
			return {};
		},
		created() {},
		methods: {
			async moveCustomerBrandDetailView(id) {
				await this.brandStore.detailBrand(id);
				this.brandStore.setCurrentBrandId(id);
				await this.marketStore.loadCustomerBrandDetailMarkets(id); // (brandId)
				await this.productStore.loadCustomerBrandDetailProducts(id); // (brandId)
				this.$router.push({
					name: `CustomerBrandDetail`,
					params: { brandId: id },
				});
			},
		},
	};
</script>

<style>
</style>