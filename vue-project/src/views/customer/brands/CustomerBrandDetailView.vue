<template>
	<div>
		<!-- <p>[CustomerBrandDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="border p-4">
				<customer-brand-detail-brand-section
					:brand="this.brandStore.brandCurrentBrand"
					:totalNumberOfProducts="
						this.productStore.productCustomerBrandDetailProducts.length
					"
					:totalNumberOfMarkets="
						this.marketStore.marketCustomerBrandDetailMarkets.length
					"
				></customer-brand-detail-brand-section>
			</div>
			<div class="mt-4 mb-4">
				<div class="grid grid-cols-12 gap-4">
					<div class="col-span-5 grid gap-2">
						<div class="text-base">
							{{ this.brandStore.brandCurrentBrand.businessName }}의 상품
						</div>
						<div class="border p-4">
							<customer-brand-detail-products-section
								:brand="this.brandStore.brandCurrentBrand"
								:products="this.productStore.productCustomerBrandDetailProducts"
							></customer-brand-detail-products-section>
						</div>
					</div>
					<div class="col-span-7 grid gap-2">
						<div class="text-base">
							{{ this.brandStore.brandCurrentBrand.businessName }}의 마켓
						</div>
						<div class="border p-4">
							<customer-brand-detail-markets-section
								:brand="this.brandStore.brandCurrentBrand"
								:markets="this.marketStore.marketCustomerBrandDetailMarkets"
							></customer-brand-detail-markets-section>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBrandDetailBrandSection from "../../../components/customer/brands/CustomerBrandDetailBrandSection.vue";
	import CustomerBrandDetailMarketsSection from "../../../components/customer/brands/CustomerBrandDetailMarketsSection.vue";
	import CustomerBrandDetailProductsSection from "../../../components/customer/brands/CustomerBrandDetailProductsSection.vue";
	import { useBookmarkStore } from "../../../stores/bookmark";
	import { useBrandStore } from "../../../stores/brand";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const marketStore = useMarketStore();
			const productStore = useProductStore();
			const lineupStore = useLineupStore();
			const bookmarkStore = useBookmarkStore();
			return {
				brandStore,
				marketStore,
				productStore,
				lineupStore,
				bookmarkStore,
			};
		},
		components: {
			CustomerBrandDetailBrandSection,
			CustomerBrandDetailProductsSection,
			CustomerBrandDetailMarketsSection,
		},
		props: ["brandId"],
		data() {
			return {};
		},
		async beforeCreate() {
			await this.brandStore.detailBrand(this.$props.brandId);
			this.brandStore.setCurrentBrandId(this.$props.brandId);
			await this.marketStore.loadCustomerBrandDetailMarkets(this.$props.brandId);
			await this.productStore.loadCustomerBrandDetailProducts(
				this.$props.brandId
			);
			await this.bookmarkStore.loadCurrentBookmarks();
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>