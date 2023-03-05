<template>
	<div>
		<!-- <p>[CustomerSearchBrandsSection.vue]</p> -->
		<div class="">브랜드 검색 결과</div>
		<div class="border mt-4 mb-8"></div>
		<div v-if="this.$props.brands.length > 0" class="grid grid-cols-4 gap-4">
			<div v-for="brand in this.$props.brands" :key="brand.id">
				<customer-brand-card :brand="brand"></customer-brand-card>
			</div>
		</div>
		<div v-else>
			<div class="flex justify-center">
				<div>검색 문구에 해당하는 브랜드가 없습니다.</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBrandCard from "../brands/CustomerBrandCard.vue";
	export default {
		setup() {},
		components: { CustomerBrandCard },
		props: ["brands"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>