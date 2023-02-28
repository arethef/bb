<template>
	<div>
		<!-- <p>[CustomerBrandDetailBrandSection.vue]</p> -->
		<!-- {{ this.$props.brand }} -->
		<div class="flex justify-start gap-8 relative">
			<div class="absolute right-0 top-0">
				<customer-bookmark-heart
					targetEntity="brand"
					:targetEntityId="this.$props.brand.id"
				></customer-bookmark-heart>
			</div>
			<div class="">
				<img
					:src="`${this.$props.brand.user.image.url}`"
					style="height: 200px; width: 200px"
				/>
			</div>
			<div class="grid grid-flow-row gap-2">
				<div class="text-2xl font-bold">
					{{ this.$props.brand.businessName }}
				</div>
				<div class="">
					{{ this.$props.brand.introduction }}
				</div>
				<div class="grid grid-flow-row gap-1 text-xs">
					<div>
						위치 | {{ this.$props.brand.user.place.basic }}
						{{ this.$props.brand.user.place.detail }}
					</div>
					<div>등록 상품 수 | {{ this.$props.totalNumberOfProducts }}</div>
					<div>오픈 마켓 수 | {{ this.$props.totalNumberOfMarkets }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {
			const brandStore = useBrandStore();
			return { brandStore };
		},
		components: { CustomerBookmarkHeart },
		props: ["brand", "totalNumberOfProducts", "totalNumberOfMarkets"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>