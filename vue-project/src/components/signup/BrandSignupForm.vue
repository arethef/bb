<template>
	<div>
		<div class="border-2 border-bb-b p-4">
			<!-- <p>[BrandSignupForm.vue]</p> -->
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
								placeholder="the-butter-place@example.com"
								v-model="reqBrandSignupDto.user.email"
							/>
							<button
								type="button"
								class="col-span-2 ml-4 inline-block px-4 bg-gray-200 text-gray-700 text-xs leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
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
								v-model="reqBrandSignupDto.user.password"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="passwordCheck" class="block">비밀번호</label>
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
								placeholder="the.butter.place"
								v-model="reqBrandSignupDto.user.username"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="businessName" class="block">상호명</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="businessName"
								class="col-span-7 form-input block text-xs"
								placeholder="The Butter Place"
								v-model="reqBrandSignupDto.brand.businessName"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="brn" class="block">사업자등록번호</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="brn"
								class="col-span-7 form-input block text-xs"
								placeholder="123-45-67890"
								v-model="reqBrandSignupDto.brand.brn"
							/>
							<button
								type="button"
								class="col-span-2 ml-4 inline-block px-4 bg-gray-200 text-gray-700 text-xs leading-tight rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
								@click="onClickBrnVerifyBtn"
							>
								인증
							</button>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="introduction" class="block">소개</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="introduction"
								class="col-span-7 form-input block text-xs"
								placeholder="The place for butter lover :)"
								v-model="reqBrandSignupDto.brand.introduction"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="zipcode" class="block">우편번호</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="zipcode"
								class="col-span-7 form-input block text-xs"
								placeholder="12345"
								v-model="reqBrandSignupDto.place.zipcode"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="basic" class="block">주소</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="basic"
								class="col-span-7 form-input block text-xs"
								placeholder="부산광역시 해운대구 우동"
								v-model="reqBrandSignupDto.place.basic"
							/>
						</div>
					</div>
				</div>
				<div class="grid grid-cols-4 gap-2">
					<div class="col-span-1">
						<div class="p-1">
							<label for="detail" class="block">상세주소</label>
						</div>
					</div>
					<div class="col-span-3">
						<div class="grid grid-flow-col-dense grid-cols-9 p-1">
							<input
								type="text"
								id="detail"
								class="col-span-7 form-input block text-xs"
								placeholder="해운대"
								v-model="reqBrandSignupDto.place.detail"
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
				class="inline-block px-4 py-2 mt-2 bg-bb-b text-white text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				@click="onClickBrandSignupBtn"
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
				reqBrandSignupDto: {
					user: {
						email: "unicorn-bakery@example.com",
						password: "unicornbakery",
						username: "unicornbakery",
					},
					role: {
						position: "brand",
					},
					place: {
						zipcode: "01004",
						basic: "서울특별시 치즈구 황동",
						detail: "단짠빌리지 101동 101호",
					},
					brand: {
						businessName: "Unicorn Bakery",
						brn: "2068650534",
						introduction: "희와제과",
					},
					image: {
						id: "",
					},
				},
				passwordCheck: "unicornbakery",
				emailPossible: false,
				brnPossible: false,
				image: {
					formData: null,
				},
			};
		},
		methods: {
			async onClickEmailCheckBtn() {
				console.log(`[BrandSignupForm.vue] onClickEmailCheckBtn()`);
				const email = this.reqBrandSignupDto.user.email;
				const result = await this.userStore.checkEmailExists({ email });
				if (!result) {
					this.emailPossible = true;
					alert("사용할 수 있는 이메일입니다.");
				} else {
					alert("사용할 수 없는 이메일입니다.");
				}
			},
			async onClickBrnVerifyBtn() {
				console.log(`[BrandSignupForm.vue] onClickBrnVerifyBtn()`);
				const b_no = this.reqBrandSignupDto.brand.brn;
				const data = {
					b_no: [b_no],
				};
				const result = await this.userStore.checkBrnValidates(data);
				console.log(`result:`, result);
				if (result.b_stt === "계속사업자") {
					this.brnPossible = true;
					alert("사업자 확인이 완료되었습니다.");
				} else {
					alert("사업자 확인이 되지 않습니다.");
				}
			},
			async onClickBrandSignupBtn() {
				console.log(`[BrandSignupForm.vue] onClickBrandSignupBtn()`);
				if (!this.emailPossible) {
					alert("이메일 확인이 완료되지 않았습니다.");
					return;
				}
				if (!this.brnPossible) {
					alert(`사업자 확인이 완료되지 않았습니다.`);
					return;
				}

				this.reqBrandSignupDto.image.id = await this.imageStore.uploadImage(
					this.image.formData
				);

				const result = await this.userStore.signup(this.reqBrandSignupDto);
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
			// async onClickEmailVerifyBtn() {
			//   console.log(`[BrandSignupForm.vue] onClickEmailVerifyBtn()`);
			//   const email = this.reqBrandSignupDto.user.email;
			//   await this.userStore.sendAndVerifyEmail({ email });
			// },
		},
	};
</script>

<style>
</style>