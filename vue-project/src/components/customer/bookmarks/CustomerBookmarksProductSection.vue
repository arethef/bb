<template>
	<div>
		<!-- <p>[CustomerBookmarksProductSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-4 gap-8">
				<div
					v-for="(
						bookmark, index
					) in this.bookmarkStore.bookmarkCurrentBookmarks.filter(
						(bookmark) => bookmark.target.product
					)"
					:key="bookmark.target.product.id"
				>
					<customer-bookmark-product-card
						:bookmarkProduct="bookmark"
						:index="index"
					></customer-bookmark-product-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBookmarkStore } from "../../../stores/bookmark";
	import CustomerBookmarkProductCard from "./CustomerBookmarkProductCard.vue";
	export default {
		setup() {
			const bookmarkStore = useBookmarkStore();
			return { bookmarkStore };
		},
		components: { CustomerBookmarkProductCard },
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>