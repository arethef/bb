<template>
	<div>
		<!-- <p>[CustomerBookmarkProductCard.vue]</p> -->
		<div class="border p-4">
			<div class="flex flex-col gap-4">
				<div class="flex justify-center cursor-pointer font-bold">
					<!-- {{ this.$props.bookmarkProduct.product.brand.businessName }} -->
					{{ this.$props.bookmarkProduct.product.name }}
				</div>
				<div>
					<img :src="`${this.$props.bookmarkProduct.product.image.url}`" />
				</div>
				<div class="text-xs relative grid grid-cols-6">
					<div class="col-span-5 text-xs">
						{{ this.$props.bookmarkProduct.product.brand.businessName }}
					</div>
					<div class="absolute right-0 top-0">
						<customer-bookmark-heart
							targetEntity="product"
							:targetEntityId="this.$props.bookmarkProduct.product.id"
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