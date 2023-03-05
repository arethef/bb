<template>
	<div>
		<div class="border-2 border-bb-b p-4">
			<!-- <p>[CustomersignupForm.vue]</p> -->
			<div class="flex flex-col gap-1 m-1">
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="email" class="block">이메일</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="email"
								id="email"
								class="col-span-7 form-input block text-xs"
								placeholder="bbang@example.com"
								v-model="reqCustomerSignupDto.user.email"
							/>
							<button
								type="button"
								class="col-span-2 ml-4 inline-block px-4 bg-gray-200 text-gray-700 font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
								@click="onClickEmailCheckBtn"
							>
								확인
							</button>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="password" class="block">비밀번호</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="password"
								id="password"
								class="col-span-7 form-input block text-xs"
								placeholder="********"
								v-model="reqCustomerSignupDto.user.password"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="passwordCheck" class="block">비밀번호확인</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="password"
								id="passwordCheck"
								class="col-span-7 form-input block text-xs"
								placeholder="********"
								v-model="passwordCheck"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="username" class="block">사용자이름</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="username"
								class="col-span-7 form-input block text-xs"
								placeholder="bbangsuni"
								v-model="reqCustomerSignupDto.user.username"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="nickname" class="block">닉네임</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="nickname"
								class="col-span-7 form-input block text-xs"
								placeholder="BBANGs2"
								v-model="reqCustomerSignupDto.customer.nickname"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="imageFile" class="block">이미지</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="file"
								accept="image/*"
								id="imageFile"
								class="col-span-7 form-control block text-xs"
								@change="selectImageFile"
							/>
						</div>

						<div class="p-1">
							<div id="imagePreview">
								<!-- <p>프로필 이미지 미리보기</p> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flex justify-end mt-4">
			<button
				type="button"
				class="inline-block px-4 py-2 mt-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				@click="onClickCustomerSignupBtn"
			>
				가입하기
			</button>
		</div>
	</div>
</template>

<script>
	import { useUserStore } from "@/stores/user";
	import { useImageStore } from "../../stores/image";
	export default {
		setup() {
			const userStore = useUserStore();
			const imageStore = useImageStore();
			return { userStore, imageStore };
		},
		components: {},
		data() {
			return {
				reqCustomerSignupDto: {
					user: {
						email: "b14map@gmail.com",
						password: "b14map",
						username: "b14map",
					},
					role: {
						position: "customer",
					},
					customer: {
						nickname: "b14map",
					},
					image: {
						id: "",
					},
				},
				passwordCheck: "b14map",
				emailPossible: false,
				image: {
					formData: null,
				},
			};
		},
		methods: {
			async onClickEmailCheckBtn() {
				console.log(`[CustomerSignupForm.vue] onClickEmailCheckBtn()`);
				const email = this.reqCustomerSignupDto.user.email;
				const result = await this.userStore.checkEmailExists({ email });
				if (!result) {
					this.emailPossible = true;
					alert("사용할 수 있는 이메일입니다.");
				} else {
					alert("사용할 수 없는 이메일입니다.");
				}
			},
			async onClickCustomerSignupBtn() {
				console.log(`[CustomerSignupForm.vue] onClickCustomerSignupBtn()`);
				if (!this.emailPossible) {
					alert("이메일 확인이 완료되지 않았습니다.");
					return;
				}

				this.reqCustomerSignupDto.image.id = await this.imageStore.uploadImage(
					this.image.formData
				);
				const result = await this.userStore.signup(this.reqCustomerSignupDto);
				if (result) {
					this.$router.push("/login");
				}
			},
			selectImageFile(e) {
				if (!e) {
					return;
				}
				const files = e.target.files;
				if (files.length > 0) {
					const formData = new FormData();
					formData.append("imageFile", files[0]);
					this.image.formData = formData;
					this.showImage(files[0]);
				} else {
					this.clearImage();
				}
			},
			showImage(file) {
				this.clearImage();
				const figure = document.createElement("figure");
				figure.classList.add("figure");
				figure.id = "figure";
				document.getElementById("imagePreview").appendChild(figure);
				const img = document.createElement("img");
				img.src = URL.createObjectURL(file);
				img.style = `width:100px; height:100px`;
				document.getElementById("figure").appendChild(img);
				const figcaption = document.createElement("figcaption");
				figcaption.classList.add("figure-caption");
				figcaption.innerHTML = `${file.name}`;
				document.getElementById("figure").appendChild(figcaption);
			},
			clearImage() {
				document.getElementById("imagePreview").innerHTML = "";
			},
		},
	};
</script>

<style>
</style>