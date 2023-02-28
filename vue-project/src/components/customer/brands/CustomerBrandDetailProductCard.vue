<template>
	<div>
		<!-- <p>[CustomerBrandDetailProductCard.vue]</p> -->
		<div class="border p-4">
			<!-- {{ this.$props.product }} -->
			<div class="flex justify-start gap-4 relative">
				<div class="absolute right-0 top-0">
					<customer-bookmark-heart
						targetEntity="product"
						:targetEntityId="this.$props.product.id"
					></customer-bookmark-heart>
				</div>
				<div class="">
					<img
						:src="`${this.$props.product.image.url}`"
						style="height: 120px; width: 120px"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<div class="">
						<span class="text-base font-bold">{{
							this.$props.product.name
						}}</span>
					</div>
					<div>{{ this.$props.product.description }}</div>
					<div>{{ this.$props.product.price }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerBookmarkHeart from "../bookmarks/CustomerBookmarkHeart.vue";
	export default {
		setup() {},
		components: { CustomerBookmarkHeart },
		props: ["product"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>