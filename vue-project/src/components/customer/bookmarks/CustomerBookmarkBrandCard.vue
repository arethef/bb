<template>
	<div>
		<!-- <p>[CustomerBookmarkBrandCard.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-4 relative">
				<div class="absolute right-0 top-0">
					<customer-bookmark-heart
						targetEntity="brand"
						:targetEntityId="this.$props.bookmarkBrand.target.brand.id"
					></customer-bookmark-heart>
				</div>
				<div
					class="cursor-pointer"
					@click="
						moveCustomerBrandDetailView(
							this.$props.bookmarkBrand.target.brand.id
						)
					"
				>
					{{ this.$props.bookmarkBrand.target.brand.businessName }}
				</div>
				<div>
					<img
						:src="`${this.$props.bookmarkBrand.target.brand.user.image.url}`"
						class="cursor-pointer"
						@click="
							moveCustomerBrandDetailView(
								this.$props.bookmarkBrand.target.brand.id
							)
						"
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
	import CustomerBookmarkHeart from "./CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const marketStore = useMarketStore();
			const productStore = useProductStore();
			return { brandStore, marketStore, productStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["bookmarkBrand"],
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