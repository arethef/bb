<template>
	<div>
		<!-- <p>[BrnadProfileVIew.vue]</p> -->
		<div class="grid grid-cols-4">
			<div class="col-span-1"></div>
			<div class="col-span-1">
				<div>
					<img
						:src="this.brandStore.brandProfile.user.image.url"
						alt=""
						style="height: 200px; width: 200px"
					/>
				</div>
			</div>
			<div class="col-span-1">
				<div class="flex flex-col gap-4">
					<div>상호 | {{ this.brandStore.brandProfile.businessName }}</div>
					<div>사업자등록번호 | {{ this.brandStore.brandProfile.brn }}</div>
					<div>
						사용자이름 | {{ this.brandStore.brandProfile.user.username }}
					</div>
					<div>이메일 | {{ this.brandStore.brandProfile.user.email }}</div>
					<div>
						<button
							class="inline-block px-4 py-2 mt-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							type="button"
							@click="onClickBrandProfileModifyBtn()"
						>
							수정하기
						</button>
					</div>
				</div>
			</div>
			<div class="col-span-1"></div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	export default {
		setup() {
			const brandStore = useBrandStore();
			return { brandStore };
		},
		props: [],
		data() {
			return {};
		},
		computed: {},
		created() {},
		methods: {
			onClickBrandProfileModifyBtn() {
				console.log(
					`++++++ [BrandProfileView.vue] onClickBrandProfileModifyBtn() ++++++`
				);
			},
		},
	};
</script>

<style>
</style>