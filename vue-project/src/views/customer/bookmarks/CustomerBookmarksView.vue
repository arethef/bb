<template>
	<div>
		<!-- <p>[CustomerBookmarksView.vue]</p> -->
		<customer-bookmarks-switch-section-radio
			@selectBookmarksSectionTarget="changeBookmarksSectionView"
		></customer-bookmarks-switch-section-radio>
		<div class="p-2"></div>
		<!-- product market brand -->
		<customer-bookmarks-product-section
			v-if="this.bookmarksSectionTarget === 'product'"
		></customer-bookmarks-product-section>
		<customer-bookmarks-market-section
			v-else-if="this.bookmarksSectionTarget === 'market'"
		></customer-bookmarks-market-section>
		<customer-bookmarks-brand-section v-else></customer-bookmarks-brand-section>
	</div>
</template>

<script>
	import CustomerBookmarksBrandSection from "../../../components/customer/bookmarks/CustomerBookmarksBrandSection.vue";
	import CustomerBookmarksMarketSection from "../../../components/customer/bookmarks/CustomerBookmarksMarketSection.vue";
	import CustomerBookmarksProductSection from "../../../components/customer/bookmarks/CustomerBookmarksProductSection.vue";
	import CustomerBookmarksSwitchSectionRadio from "../../../components/customer/bookmarks/CustomerBookmarksSwitchSectionRadio.vue";
	import { useBookmarkStore } from "../../../stores/bookmark";
	export default {
		setup() {
			const bookmarkStore = useBookmarkStore();
			return { bookmarkStore };
		},
		components: {
			CustomerBookmarksProductSection,
			CustomerBookmarksMarketSection,
			CustomerBookmarksBrandSection,
			CustomerBookmarksSwitchSectionRadio,
		},
		data() {
			return {
				bookmarksSectionTarget: "product",
			};
		},
		async beforeCreate() {
			this.bookmarkStore.loadCurrentBookmarks();
		},
		created() {},
		methods: {
			changeBookmarksSectionView(target) {
				this.bookmarksSectionTarget = target;
			},
		},
	};
</script>

<style>
</style>