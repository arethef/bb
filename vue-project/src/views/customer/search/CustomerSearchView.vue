<template>
	<div>
		<!-- <p>[CustomerSearchView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="flex flex-col gap-8">
				<div class="flex justify-center items-center">
					<span class="font-bold text-lg">"{{ this.$props.searchStr }}"</span>
					에 대한 검색 결과입니다.
				</div>
				<div class="flex flex-col gap-8">
					<customer-search-markets-section
						:markets="this.searchStore.searchMarkets"
					></customer-search-markets-section>
					<customer-search-brands-section
						:brands="this.searchStore.searchBrands"
					></customer-search-brands-section>
					<customer-search-products-section
						:products="this.searchStore.searchProducts"
					></customer-search-products-section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerSearchBrandsSection from "../../../components/customer/search/CustomerSearchBrandsSection.vue";
	import CustomerSearchMarketsSection from "../../../components/customer/search/CustomerSearchMarketsSection.vue";
	import CustomerSearchProductsSection from "../../../components/customer/search/CustomerSearchProductsSection.vue";
	import { useSearchStore } from "../../../stores/search";
	export default {
		setup() {
			const searchStore = useSearchStore();
			return { searchStore };
		},
		components: {
			CustomerSearchMarketsSection,
			CustomerSearchBrandsSection,
			CustomerSearchProductsSection,
		},
		props: ["searchStr"],
		data() {
			return {};
		},
		async beforeCreate() {
			await this.searchStore.loadSearchResult(this.$props.searchStr);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>