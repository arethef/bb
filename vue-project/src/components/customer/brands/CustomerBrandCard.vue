<template>
	<div>
		<!-- <p>[CustomerBrandCard.vue]</p> -->
		<div class="border p-4">
			<div class="grid gird-flow-row gap-4">
				<div class="flex justify-center">
					{{ this.$props.brand.businessName }}
					좋아요
				</div>
				<div class="">
					<img :src="`${this.$props.brand.user.image.url}`" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		setup() {},
		components: {},
		props: ["brand"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>