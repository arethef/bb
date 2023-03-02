<template>
	<div>
		<!-- <p>[CustomerProfileView.vue]</p> -->
		<div class="grid grid-cols-10 gap-8">
			<div class="col-span-2"></div>
			<div class="col-span-2">
				<div class="flex flex-col gap-1">
					<div class="p-1">
						<img
							id="profileImage"
							:src="this.customerStore.customerProfile.user.image.url"
							alt=""
							style="height: 200px; width: 200px"
						/>
					</div>
					<div class="p-1">
						<input type="file" @change="selectImageFile" />
					</div>
				</div>
			</div>
			<div class="col-span-4">
				<div class="flex flex-col gap-1">
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="nickname" class="block">닉네임</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="nickname"
									class="col-span-7 form-input block text-xs"
									v-model="this.customerStore.customerProfile.nickname"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="zipcode" class="block">우편번호</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="zipcode"
									class="col-span-7 form-input block text-xs"
									:v-model="
										this.customerStore.customerProfile.user.place
											? this.customerStore.customerProfile.user.place.zipcode
											: ''
									"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="basic" class="block">주소</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="basic"
									class="col-span-7 form-input block text-xs"
									:v-model="
										this.customerStore.customerProfile.user.place
											? this.customerStore.customerProfile.user.place.basic
											: ''
									"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="detail" class="block">상세주소</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="detail"
									class="col-span-7 form-input block text-xs"
									:v-model="
										this.customerStore.customerProfile.user.place
											? this.customerStore.customerProfile.user.place.detail
											: ''
									"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="username" class="block">사용자이름</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="username"
									class="col-span-7 form-input block text-xs"
									v-model="this.customerStore.customerProfile.user.username"
								/>
								<div class="col-span-2">
									<button
										type="button"
										class="inline-block ml-4 my-1 p-1 bg-gray-200 text-gray-700 text-xs leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
										@click="onClickUsernameCheckBtn"
									>
										중복확인
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="email" class="block">이메일</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="email"
									id="email"
									class="col-span-7 form-input block text-xs"
									v-model="this.customerStore.customerProfile.user.email"
								/>
								<div class="col-span-2">
									<button
										type="button"
										class="inline-block ml-4 my-1 p-1 bg-gray-200 text-gray-700 text-xs leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
										@click="onClickEmailCheckBtn"
									>
										중복확인
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="password" class="block">비밀번호</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="password"
									id="password"
									class="col-span-7 form-input block text-xs"
									v-model="this.reqUpdateCustomerDto.user.password"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="passwordCheck" class="block">비밀번호 확인</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="password"
									id="passwordCheck"
									class="col-span-7 form-input block text-xs"
									v-model="this.passwordCheck"
								/>
							</div>
						</div>
					</div>
					<!-- <div>
						사용자이름 | {{ this.customerStore.customerProfile.user.username }}
					</div>
					<div>
						이메일 | {{ this.customerStore.customerProfile.user.email }}
					</div> -->

					<div class="text-center mt-4">
						<button
							class="inline-block px-4 py-2 bg-bb-b text-white text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							type="button"
							@click="onClickCustomerProfileModifyBtn()"
						>
							적용하기
						</button>
					</div>
				</div>
			</div>
			<div class="col-span-2"></div>
		</div>
	</div>
</template>

<script>
	import { useCustomerStore } from "../../../stores/customer";
	import { useImageStore } from "../../../stores/image";
	import { useUserStore } from "../../../stores/user";
	export default {
		setup() {
			const customerStore = useCustomerStore();
			const imageStore = useImageStore();
			const userStore = useUserStore();
			return { customerStore, imageStore, userStore };
		},
		data() {
			return {
				reqUpdateCustomerDto: {
					user: {
						email: "",
						username: "",
						password: "",
						image: {
							id: "",
						},
						place: {
							zipcode: "",
							basic: "",
							detail: "",
						},
					},
					nickname: "",
				},
				image: {
					formData: null,
				},
				passwordCheck: "",
				emailPossible: false,
				usernamePossible: false,
			};
		},
		computed: {},
		mounted() {},
		methods: {
			async onClickCustomerProfileModifyBtn() {
				console.log(
					`++++++ [CustomerProfileView.vue] onClickCustomerProfileModifyBtn() ++++++`
				);
				if (
					document.getElementById("email").value !==
						this.customerStore.customerProfile.user.email &&
					!this.emailPossible
				) {
					alert("이메일 중복확인이 완료되지 않았습니다.");
					return;
				}
				if (
					document.getElementById("username").value !==
						this.customerStore.customerProfile.user.username &&
					!this.usernamePossible
				) {
					alert("사용자이름 중복확인이 완료되지 않았습니다.");
					return;
				}
				if (
					document.getElementById("password").value &&
					this.reqUpdateCustomerDto.user.password !== this.passwordCheck
				) {
					alert("비밀번호가 일치하는지 확인해주세요.");
					return;
				}
				if (
					(document.getElementById("zipcode").value !== "" ||
						document.getElementById("basic").value !== "" ||
						document.getElementById("detail").value !== "") &&
					(!document.getElementById("zipcode").value ||
						!document.getElementById("basic").value ||
						!document.getElementById("detail").value)
				) {
					alert("주소정보를 끝까지 입력해주세요.");
					return;
				}
				await this.setReqUpdateCustomerDto();
				await this.customerStore.updateCustomer(this.reqUpdateCustomerDto);
				this.$router.go(0);
			},
			selectImageFile(e) {
				console.log(`++++++ [CustomerProfileView.vue] selecteImageFile() ++++++`);
				if (!e) {
					return;
				}
				const files = e.target.files;
				if (files.length > 0) {
					const formData = new FormData();
					formData.append("imageFile", files[0]);
					this.image.formData = formData;
					this.updateImage(files[0]);
				} else {
					alert("프로필 이미지를 비워놓을 수 없습니다.");
				}
			},
			async setReqUpdateCustomerDto() {
				if (
					document.getElementById("email").value !==
					this.customerStore.customerProfile.user.email
				) {
					this.reqUpdateCustomerDto.user.email =
						document.getElementById("email").value;
				} else {
					this.reqUpdateCustomerDto.user.email =
						this.customerStore.customerProfile.user.email;
				}
				if (
					document.getElementById("username").value !==
					this.customerStore.customerProfile.user.username
				) {
					this.reqUpdateCustomerDto.user.username =
						document.getElementById("username").value;
				} else {
					this.reqUpdateCustomerDto.user.username =
						this.customerStore.customerProfile.user.username;
				}
				if (document.getElementById("password").value) {
					this.reqUpdateCustomerDto.user.password =
						document.getElementById("password").value;
				}
				if (this.image.formData) {
					this.reqUpdateCustomerDto.user.image.id =
						await this.imageStore.uploadImage(this.image.formData);
				} else {
					this.reqUpdateCustomerDto.user.image.id =
						this.customerStore.customerProfile.user.image.id;
				}
				if (
					!document.getElementById("zipcode").value &&
					!document.getElementById("basic").value &&
					!document.getElementById("detail").value
				) {
					this.reqUpdateCustomerDto.place = null;
				} else {
					this.reqUpdateCustomerDto.user.place.zipcode =
						document.getElementById("zipcode").value;
					this.reqUpdateCustomerDto.user.place.basic =
						document.getElementById("basic").value;
					this.reqUpdateCustomerDto.user.place.detail =
						document.getElementById("detail").value;
				}
				this.reqUpdateCustomerDto.nickname =
					document.getElementById("nickname").value;
			},
			updateImage(file) {
				const profileImage = document.getElementById("profileImage");
				profileImage.src = "";
				profileImage.src = URL.createObjectURL(file);
			},
			async onClickEmailCheckBtn() {
				console.log(`[CustomerProfileView.vue] onClickEmailCheckBtn()`);
				const email = document.getElementById("email").value;
				const result = await this.userStore.checkEmailExists({ email });
				if (!result) {
					this.emailPossible = true;
					alert("사용할 수 있는 이메일입니다.");
				} else {
					alert("사용할 수 없는 이메일입니다.");
				}
			},
			async onClickUsernameCheckBtn() {
				console.log(`[CustomerProfileView.vue] onClickUsernameCheckBtn()`);
				console.log(this.customerStore.customerProfile.user.username);
				const username = document.getElementById("username").value;
				const result = await this.userStore.checkUserUsernameExists({ username });
				if (!result) {
					this.usernamePossible = true;
					alert("사용할 수 있는 사용자이름입니다.");
				} else {
					alert("사용할 수 없는 사용자이름입니다.");
				}
			},
		},
	};
</script>

<style>
</style>