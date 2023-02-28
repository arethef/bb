<template>
	<div>
		<!-- <p>[CustomerProfileView.vue]</p> -->
		<div class="grid grid-cols-4">
			<div class="col-span-1"></div>
			<div class="col-span-1">
				<div>
					<img
						:src="this.customerStore.customerProfile.user.image.url"
						alt=""
						style="height: 200px; width: 200px"
					/>
				</div>
			</div>
			<div class="col-span-1">
				<div class="flex flex-col gap-4">
					<div>
						사용자이름 | {{ this.customerStore.customerProfile.user.username }}
					</div>
					<div>
						이메일 | {{ this.customerStore.customerProfile.user.email }}
					</div>
					<div>
						<button
							class="inline-block px-4 py-2 mt-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							type="button"
							@click="onClickCustomerProfileModifyBtn()"
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
	import { useCustomerStore } from "../../../stores/customer";
	export default {
		setup() {
			const customerStore = useCustomerStore();
			return { customerStore };
		},
		methods: {
			onClickCustomerProfileModifyBtn() {
				console.log(
					`++++++ [CustomerProfileView.vue] onClickCustomerProfileModifyBtn() ++++++`
				);
			},
		},
	};
</script>

<style>
</style>