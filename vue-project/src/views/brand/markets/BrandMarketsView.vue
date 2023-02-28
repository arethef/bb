<template>
	<div>
		<!-- <p>[BrandMarketsView.vue]</p> -->
		<brand-market-new-button></brand-market-new-button>
		<brand-markets-table></brand-markets-table>
	</div>
</template>

<script>
	import BrandMarketNewButton from "../../../components/brand/markets/BrandMarketNewButton.vue";
	import BrandMarketsTable from "../../../components/brand/markets/BrandMarketsTable.vue";
	export default {
		setup() {},
		components: { BrandMarketNewButton, BrandMarketsTable },
	};
</script>

<style></style>
