<template>
	<div>
		<!-- <p>[CustomerBookmarksMarketSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-4 gap-8">
				<div
					v-for="(
						bookmark, index
					) in this.bookmarkStore.bookmarkCurrentBookmarks.filter(
						(bookmark) => bookmark.target.market
					)"
					:key="bookmark.target.market.id"
				>
					<customer-bookmark-market-card
						:bookmarkMarket="bookmark"
						:index="index"
					></customer-bookmark-market-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBookmarkStore } from "../../../stores/bookmark";
	import CustomerBookmarkMarketCard from "./CustomerBookmarkMarketCard.vue";
	export default {
		setup() {
			const bookmarkStore = useBookmarkStore();
			return { bookmarkStore };
		},
		components: { CustomerBookmarkMarketCard },
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>