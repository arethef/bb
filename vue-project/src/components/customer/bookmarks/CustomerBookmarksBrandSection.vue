<template>
	<div>
		<!-- <p>[CustomerBookmarksBrandSection.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-4 gap-8">
				<div
					v-for="(
						bookmark, index
					) in this.bookmarkStore.bookmarkCurrentBookmarks.filter(
						(bookmark) => bookmark.brand
					)"
					:key="bookmark.brand.id"
				>
					<customer-bookmark-brand-card
						:bookmarkBrand="bookmark"
						:index="index"
					></customer-bookmark-brand-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBookmarkStore } from "../../../stores/bookmark";
	import CustomerBookmarkBrandCard from "./CustomerBookmarkBrandCard.vue";
	export default {
		setup() {
			const bookmarkStore = useBookmarkStore();
			return { bookmarkStore };
		},
		components: { CustomerBookmarkBrandCard },
		data() {
			return {};
		},
		async beforeCreate() {
			await this.bookmarkStore.loadCurrentBookmarks();
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>