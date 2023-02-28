<template>
	<div>
		<div class="border-2 border-bb-b p-4">
			<!-- <p>[LoginForm.vue]</p> -->
			<div class="grid grid-flow-col-dense grid-cols-4 gap-2">
				<div class="col-span-1 grid gap-1 m-1">
					<div class="p-1">
						<label for="username" class="block">사용자이름</label>
					</div>
					<div class="p-1">
						<label for="password" class="block">비밀번호</label>
					</div>
				</div>
				<div class="col-span-3 grid gap-1 m-1">
					<div class="grid grid-flow-col-dense grid-cols-9 p-1">
						<input
							type="text"
							id="username"
							class="col-span-9 form-input block text-xs"
							placeholder="bbang@example.com"
							v-model="reqLoginDto.username"
						/>
						<!-- v-model="reqLoginDto.user.username" -->
					</div>
					<div class="grid grid-flow-col-dense grid-cols-9 p-1">
						<input
							type="password"
							id="password"
							class="col-span-9 form-input block text-xs"
							placeholder="********"
							v-model="reqLoginDto.password"
						/>
						<!-- v-model="reqLoginDto.user.password" -->
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end mt-4">
			<button
				type="button"
				class="inline-block px-4 py-2 mt-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				@click="onClickLoginBtn"
			>
				로그인하기
			</button>
			<!-- <button @click="onClickTestRefreshBtn">테스트Refresh</button>
			<button @click="onClickTestJwtGuardBtn">테스트JwtGuard</button>
			<button @click="onClickTestReturnUserBtn">테스트ReturnUser</button> -->
		</div>
	</div>
</template>

<script>
	import { useUserStore } from "@/stores/user";
	import { useBrandStore } from "../../stores/brand";
	import { useCustomerStore } from "../../stores/customer";
	export default {
		setup() {
			const userStore = useUserStore();
			const brandStore = useBrandStore();
			const customerStore = useCustomerStore();
			return { userStore, brandStore, customerStore };
		},
		components: {},
		data() {
			return {
				reqLoginDto: {
					// user: {
					username: "b14map",
					password: "b14map",
					// },
				},
			};
		},
		methods: {
			async onClickLoginBtn() {
				console.log(`++++++ [LoginForm.vue] onClickLoginBtn() ++++++`);
				const result = await this.userStore.login(this.reqLoginDto);
				console.log(`❯❯❯❯❯❯ result:`, result);
				if (result.role.position === "brand") {
					// 브랜드 정보 저장할 수 있도록 정보 요청 후 라우터 푸시
					await this.brandStore.getBrandProfile();
					this.$router.push("/b");
				} else {
					// 고객 정보 저장할 수 있도록 정보 요청 후 라우터 푸시
					await this.customerStore.getCustomerProfile();
					this.$router.push("/c");
				}
			},
			async onClickTestRefreshBtn() {
				console.log(`++++++ [LoginForm.vue] onClickTestRefreshBtn() ++++++`);
				const axiosResult = await this.userStore.testRefresh();
				console.log(`❯❯❯❯❯❯ axiosResult:`, axiosResult);
			},
			async onClickTestJwtGuardBtn() {
				console.log(`++++++ [LoginForm.vue] onClickTestJwtGuardBtn() ++++++`);
				const axiosResult = await this.userStore.testJwtGuard();
				console.log(`❯❯❯❯❯❯ axiosResult:`, axiosResult);
			},
			async onClickTestReturnUserBtn() {
				console.log(`++++++ [LoginForm.vue] onClickTestReturnUserBtn() ++++++`);
				const axiosResult = await this.userStore.testReturnUser();
				console.log(`❯❯❯❯❯❯ axiosResult:`, axiosResult);
			},
		},
	};
</script>

<style>
</style>