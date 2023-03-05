<template>
	<div v-if="this.bookmarkStore.bookmarkCurrentBookmarks">
		<button @click="onClickBookmarkHeartBtn()">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				:fill="`${this.heartFilled ? 'full' : 'none'}`"
				viewBox="0 0 28 28"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
				/>
			</svg>
		</button>
	</div>
</template>

<script>
	import { useBookmarkStore } from "../../../stores/bookmark";
	export default {
		setup() {
			const bookmarkStore = useBookmarkStore();
			return { bookmarkStore };
		},
		components: {},
		props: ["targetEntity", "targetEntityId"],
		data() {
			return {
				heartFilled:
					this.$props.targetEntity === "product"
						? this.bookmarkStore.bookmarkCurrentBookmarksProductIdList.includes(
								this.$props.targetEntityId
						  )
						: this.$props.targetEntity === "market"
						? this.bookmarkStore.bookmarkCurrentBookmarksMarketIdList.includes(
								this.$props.targetEntityId
						  )
						: this.bookmarkStore.bookmarkCurrentBookmarksBrandIdList.includes(
								this.$props.targetEntityId
						  ),
			};
		},
		computed: {},
		async beforeCreate() {
			await this.bookmarkStore.loadCurrentBookmarks();
		},
		created() {
			// console.log(`++++++ [CustomerBookmarkHear.vue] created() ++++++`);
			// console.log(
			// 	`❯❯❯❯❯❯ [CustomerBookmarkHear.vue] created() this.bookmarkStore.bookmarkCurrentBookmarksProduct:`,
			// 	this.bookmarkStore.bookmarkCurrentBookmarksProduct
			// );
		},
		methods: {
			async onClickBookmarkHeartBtn() {
				// console.log(
				// 	`++++++ [CustomerBookmarkHear.vue] onClickBookmarkHeartBtn() ++++++`
				// );
				// console.log(
				// 	`❯❯❯❯❯❯ [CustomerBookmarkHear.vue] onClickBookmarkHeartBtn() this.$props.targetEntity:`,
				// 	this.$props.targetEntity,
				// 	`this.$props.targetEntityId:`,
				// 	this.$props.targetEntityId
				// );
				switch (this.$props.targetEntity) {
					case "product":
						if (
							this.bookmarkStore.bookmarkCurrentBookmarksProductIdList.includes(
								this.$props.targetEntityId
							)
						) {
							await this.bookmarkStore.deleteBookmarkProduct(
								this.$props.targetEntityId
							);
							this.heartFilled = false;
						} else {
							await this.bookmarkStore.insertBookmarkProduct(
								this.$props.targetEntityId
							);
							this.heartFilled = true;
						}
						break;
					case "market":
						if (
							this.bookmarkStore.bookmarkCurrentBookmarksMarketIdList.includes(
								this.$props.targetEntityId
							)
						) {
							await this.bookmarkStore.deleteBookmarkMarket(
								this.$props.targetEntityId
							);
							this.heartFilled = false;
						} else {
							await this.bookmarkStore.insertBookmarkMarket(
								this.$props.targetEntityId
							);
							this.heartFilled = true;
						}
						break;
					case "brand":
						if (
							this.bookmarkStore.bookmarkCurrentBookmarksBrandIdList.includes(
								this.$props.targetEntityId
							)
						) {
							await this.bookmarkStore.deleteBookmarkBrand(
								this.$props.targetEntityId
							);
							this.heartFilled = false;
						} else {
							await this.bookmarkStore.insertBookmarkBrand(
								this.$props.targetEntityId
							);
							this.heartFilled = true;
						}
						break;
				}
				await this.bookmarkStore.loadCurrentBookmarks();
			},
		},
	};
</script>

<style>
</style>