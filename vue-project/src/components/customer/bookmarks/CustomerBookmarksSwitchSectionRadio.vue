<template>
	<div>
		<div class="md:container md:mx-auto">
			<!-- <p>[CustomerBookmarksSwitchSectionRadio.vue]</p> -->
			<div class="flex justify-center m-4">
				<div class="grid grid-flow-col gap-4">
					<div class="form-check form-check-inline">
						<input
							type="radio"
							name="bookmarksSectionTarget"
							id="product"
							class="peer hidden form-check-input"
							autocomplete="off"
							value="product"
							v-model="this.bookmarksSectionTarget"
							@change="onChangeBookmarksSectionTarget($event)"
							checked
						/>
						<label
							for="product"
							class="form-check-label cursor-pointer px-4 py-2 rounded select-none border-2 border-pink-300 font-bold text-pink-300 peer-checked:bg-pink-300 peer-checked:font-bold peer-checked:text-white"
							>상품</label
						>
					</div>
					<div class="form-check form-check-inline">
						<input
							type="radio"
							name="bookmarksSectionTarget"
							id="market"
							class="peer hidden form-check-input"
							autocomplete="off"
							value="market"
							v-model="this.bookmarksSectionTarget"
							@change="onChangeBookmarksSectionTarget($event)"
						/>
						<label
							for="market"
							class="form-check-label cursor-pointer px-4 py-2 rounded select-none border-2 border-pink-300 font-bold text-pink-300 peer-checked:bg-pink-300 peer-checked:font-bold peer-checked:text-white"
							>마켓</label
						>
					</div>
					<div class="form-check form-check-inline">
						<input
							type="radio"
							name="bookmarksSectionTarget"
							id="brand"
							class="peer hidden form-check-input"
							autocomplete="off"
							value="brand"
							v-model="this.bookmarksSectionTarget"
							@change="onChangeBookmarksSectionTarget($event)"
						/>
						<label
							for="brand"
							class="form-check-label cursor-pointer px-4 py-2 rounded select-none border-2 border-pink-300 font-bold text-pink-300 peer-checked:bg-pink-300 peer-checked:font-bold peer-checked:text-white"
							>브랜드</label
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		setup() {},
		components: {},
		data() {
			return {
				bookmarksSectionTarget: "",
			};
		},
		created() {},
		methods: {
			onChangeBookmarksSectionTarget(event) {
				this.$emit("selectBookmarksSectionTarget", event.target.value);
			},
		},
	};
</script>

<style>
</style>