<template>
	<div>
		<!-- <p>[CustomerBookmarkProductCard.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-2">
				<div class="flex justify-center">
					<!-- {{ this.$props.bookmarkProduct.target.product.brand.businessName }} -->
					{{ this.$props.bookmarkProduct.target.product.name }}
				</div>
				<div>
					<img
						:src="`${this.$props.bookmarkProduct.target.product.image.url}`"
					/>
				</div>
				<div class="text-xs relative">
					<div class="p-0.5"></div>
					{{ this.$props.bookmarkProduct.target.product.brand.businessName }}
					<div class="absolute right-0 top-0">
						<customer-bookmark-heart
							targetEntity="product"
							:targetEntityId="this.$props.bookmarkProduct.target.product.id"
						></customer-bookmark-heart>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBookmarkHeart from "./CustomerBookmarkHeart.vue";
	export default {
		setup() {},
		components: { CustomerBookmarkHeart },
		props: ["bookmarkProduct"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>