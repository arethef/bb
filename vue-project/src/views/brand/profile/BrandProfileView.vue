<template>
	<div class="md:container md:mx-auto">
		<!-- <p>[BrnadProfileVIew.vue]</p> -->
		<div
			v-if="this.brandStore.brandProfile !== undefined"
			class="grid grid-cols-12 gap-8"
		>
			<div class="col-span-3">
				<div class="flex flex-col gap-1">
					<div class="p-1">
						<img
							:src="`${this.brandStore.brandProfile.user.image.url}`"
							id="profileImage"
							alt=""
							style="height: 200px; width: 200px"
						/>
					</div>
					<div class="p-1">
						<input type="file" @change="selectImageFile" />
					</div>
				</div>
			</div>
			<div class="col-span-5">
				<div class="flex flex-col gap-1">
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="businessName" class="block">상호</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="businessName"
									class="col-span-7 form-input block text-xs"
									v-model="this.brandStore.brandProfile.businessName"
									disabled
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="introduction" class="block">소개</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="introduction"
									class="col-span-7 form-input block text-xs"
									v-model="this.brandStore.brandProfile.introduction"
								/>
							</div>
						</div>
					</div>
					<div class="grid grid-cols-12 gap-2">
						<div class="col-span-3">
							<div class="p-1 my-1">
								<label for="brn" class="block">사업자등록번호</label>
							</div>
						</div>
						<div class="col-span-9">
							<div class="grid grid-flow-col-dense grid-cols-9 p-1">
								<input
									type="text"
									id="brn"
									class="col-span-7 form-input block text-xs"
									v-model="this.brandStore.brandProfile.brn"
									disabled
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
									v-model="this.brandStore.brandProfile.user.place.zipcode"
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
									v-model="this.brandStore.brandProfile.user.place.basic"
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
									v-model="this.brandStore.brandProfile.user.place.detail"
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
									v-model="this.brandStore.brandProfile.user.username"
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
									v-model="this.brandStore.brandProfile.user.email"
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
									v-model="this.reqUpdateBrandDto.user.password"
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
					<!-- <div>상호 | {{ this.brandStore.brandProfile.businessName }}</div>
					<div>사업자등록번호 | {{ this.brandStore.brandProfile.brn }}</div>
					<div>
						주소 | {{ this.brandStore.brandProfile.user.place.basic }},
						{{ this.brandStore.brandProfile.user.place.detail }}
					</div>
					<div>
						사용자이름 | {{ this.brandStore.brandProfile.user.username }}
					</div>
					<div>이메일 | {{ this.brandStore.brandProfile.user.email }}</div> -->
					<div class="text-center mt-4">
						<button
							class="inline-block px-4 py-2 bg-bb-b text-white text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							type="button"
							@click="onClickBrandProfileModifyBtn()"
						>
							적용하기
						</button>
					</div>
				</div>
			</div>

			<div class="col-span-4">
				<div class="flex flex-col gap-1">
					<div class="flex flex-row gap-1">
						<div>링크</div>
						<button type="button" @click="onClickAddLinkBtn()">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 28 28"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>
					</div>
					<div class="flex flex-col gap-2" id="link-list">
						<div
							v-for="link in this.linkStore.linkCurrentLinks"
							:key="link.id"
							class="grid grid-cols-8 gap-2"
							:id="`div-original-${link.id}`"
						>
							<div class="col-span-3 grid grid-cols-2 gap-1">
								<label :for="`name-original-${link.id}`" class="block"
									>플랫폼</label
								>
								<input
									type="text"
									:id="`name-original-${link.id}`"
									class="form-input block text-xs col-span-full bg-bb-bg"
									:value="link.name"
									disabled
								/>
							</div>
							<div class="col-span-4 grid grid-cols-6 gap-1">
								<label :for="`url-original-${link.id}`" class="block"
									>URL</label
								>
								<input
									type="text"
									:id="`url-ogirinal-${link.id}`"
									class="col-span-full form-input block text-xs bg-bb-bg"
									:value="link.url"
									disabled
								/>
							</div>
							<div class="col-span-1 flex flex-col items-center">
								<button
									type="button"
									@click="onClickOriginalDeleteLinkBtn(link.id)"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 28 28"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useBrandStore } from "../../../stores/brand";
	import { useImageStore } from "../../../stores/image";
	import { useUserStore } from "@/stores/user";
	import { useLinkStore } from "@/stores/link";
	export default {
		setup() {
			const brandStore = useBrandStore();
			const imageStore = useImageStore();
			const userStore = useUserStore();
			const linkStore = useLinkStore();
			return { brandStore, imageStore, userStore, linkStore };
		},
		props: [],
		data() {
			return {
				reqUpdateBrandDto: {
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
					introduction: "",
				},
				image: {
					formData: null,
				},
				passwordCheck: "",
				emailPossible: false,
				usernamePossible: false,
				links: [],
				linkIdxes: [],
				delLinkIds: [],
			};
		},
		computed: {},
		async beforeCreate() {
			await this.brandStore.getBrandProfile();
			await this.linkStore.loadLinks(this.brandStore.brandProfile.id);
		},
		created() {},
		methods: {
			async onClickBrandProfileModifyBtn() {
				console.log(
					`++++++ [BrandProfileView.vue] onClickBrandProfileModifyBtn() ++++++`
				);
				if (
					document.getElementById("email").value !==
						this.brandStore.brandProfile.user.email &&
					!this.emailPossible
				) {
					alert("이메일 중복확인이 완료되지 않았습니다.");
					return;
				}
				if (
					document.getElementById("username").value !==
						this.brandStore.brandProfile.user.username &&
					!this.usernamePossible
				) {
					alert("사용자이름 중복확인이 완료되지 않았습니다.");
					return;
				}
				if (
					document.getElementById("password").value &&
					this.reqUpdateBrandDto.user.password !== this.passwordCheck
				) {
					alert("비밀번호가 일치하는지 확인해주세요.");
					return;
				}
				await this.updateBrandLinks();
				await this.setReqUpdateBrandDto();
				await this.brandStore.updateBrand(this.reqUpdateBrandDto);
				// this.$router.go(this.$router.currentRoute);
				this.$router.go(0);
			},
			async updateBrandLinks() {
				if (this.linkIdxes.length > 0) {
					let reqInsertLinksDto = [];
					for (const idx of this.linkIdxes) {
						const name = document.getElementById(`name-${idx}`).value;
						const url = document.getElementById(`url-${idx}`).value;
						reqInsertLinksDto.push({ name, url });
					}
					await this.linkStore.insertLinks(reqInsertLinksDto);
				}
				if (this.delLinkIds.length > 0) {
					await this.linkStore.deleteLinks(this.delLinkIds);
				}
				await this.linkStore.loadLinks(this.brandStore.brandProfile.id);
			},
			async setReqUpdateBrandDto() {
				if (
					document.getElementById("email").value !==
					this.brandStore.brandProfile.user.email
				) {
					this.reqUpdateBrandDto.user.email =
						document.getElementById("email").value;
				} else {
					this.reqUpdateBrandDto.user.email =
						this.brandStore.brandProfile.user.email;
				}
				if (
					document.getElementById("username").value !==
					this.brandStore.brandProfile.user.username
				) {
					this.reqUpdateBrandDto.user.username =
						document.getElementById("username").value;
				} else {
					this.reqUpdateBrandDto.user.username =
						this.brandStore.brandProfile.user.username;
				}
				if (document.getElementById("password").value) {
					this.reqUpdateBrandDto.user.password =
						document.getElementById("password").value;
				}
				if (this.image.formData) {
					this.reqUpdateBrandDto.user.image.id =
						await this.imageStore.uploadImage(this.image.formData);
				} else {
					this.reqUpdateBrandDto.user.image.id =
						this.brandStore.brandProfile.user.image.id;
				}
				this.reqUpdateBrandDto.user.place.zipcode =
					document.getElementById("zipcode").value;
				this.reqUpdateBrandDto.user.place.basic =
					document.getElementById("basic").value;
				this.reqUpdateBrandDto.user.place.detail =
					document.getElementById("detail").value;
				this.reqUpdateBrandDto.introduction =
					document.getElementById("introduction").value;
			},
			async onClickAddLinkBtn() {
				console.log(`++++++ [BrandProfileView.vue] onClickAddLinkBtn() ++++++`);

				let linkList = document.getElementById("link-list");
				let div = document.createElement("div");
				div.setAttribute("class", "grid grid-cols-8 gap-2");
				div.setAttribute("id", `div-${this.links.length}`);
				let divName = document.createElement("div");
				divName.setAttribute("class", "col-span-3 grid grid-cols-2 gap-1");
				let labelName = document.createElement("label");
				labelName.setAttribute("for", "name-${this.links.length}");
				labelName.setAttribute("class", "block");
				labelName.innerHTML = `플랫폼`;
				let inputName = document.createElement("input");
				inputName.setAttribute("type", "text");
				inputName.setAttribute("id", `name-${this.links.length}`);
				inputName.setAttribute("class", "form-input block text-xs col-span-full");
				divName.appendChild(labelName);
				divName.appendChild(inputName);

				let divUrl = document.createElement("div");
				divUrl.setAttribute("class", "col-span-4 grid grid-cols-6 gap-1");
				let labelUrl = document.createElement("label");
				labelUrl.setAttribute("for", `url-${this.links.length}`);
				labelUrl.setAttribute("class", "block");
				labelUrl.innerHTML = `URL`;
				let inputUrl = document.createElement("input");
				inputUrl.setAttribute("type", "text");
				inputUrl.setAttribute("id", `url-${this.links.length}`);
				inputUrl.setAttribute("class", "col-span-full form-input block text-xs");
				divUrl.appendChild(labelUrl);
				divUrl.appendChild(inputUrl);

				let divDel = document.createElement("div");
				divDel.setAttribute("class", "col-span-1 flex flex-col items-center");
				let buttonDel = document.createElement("button");
				buttonDel.setAttribute("type", "button");
				buttonDel.setAttribute("class", `btn-${this.links.length}`);
				let onClickDeleteLinkBtn = () => {
					// this.onClickDeleteLinkBtn(this.links.length);
					// let idx = document.getElementById("link-list").childElementCount;
					let idx = buttonDel.getAttribute("class").split("-")[1];
					this.onClickDeleteLinkBtn(idx);
				};
				buttonDel.onclick = onClickDeleteLinkBtn;
				buttonDel.innerHTML = `
																																														<svg
																																															xmlns="http://www.w3.org/2000/svg"
																																															fill="none"
																																															viewBox="0 0 28 28"
																																															stroke-width="1.5"
																																															stroke="currentColor"
																																															class="w-6 h-6"
																																														>
																																															<path
																																																stroke-linecap="round"
																																																stroke-linejoin="round"
																																																d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
																																															/>
																																														</svg>
																																													`;
				let emptyDivDel = document.createElement("div");
				divDel.appendChild(buttonDel);
				divDel.appendChild(emptyDivDel);

				div.appendChild(divName);
				div.appendChild(divUrl);
				div.appendChild(divDel);

				linkList.appendChild(div);

				// this.links.push({ idx: this.links.length, name: "", url: "" });
				this.linkIdxes.push(this.links.length);
				this.links.push({ idx: this.links.length, name: this.temp, url: "" });
			},
			onClickDeleteLinkBtn(idx) {
				console.log(
					`++++++ [BrandProfileView.vue] onClickDeleteLinkBtn() ++++++`
				);
				this.linkIdxes.splice(this.linkIdxes.indexOf(Number(idx)), 1);
				document
					.getElementById("link-list")
					.removeChild(document.getElementById(`div-${idx}`));
				console.log(
					`❯❯❯❯❯❯ [BrandProfileView.vue] onClickDeleteLinkBtn() this.links:`,
					this.links
				);
				console.log(
					`❯❯❯❯❯❯ [BrandProfileView.vue] onClickDeleteLinkBtn() this.linkIdxes:`,
					this.linkIdxes
				);
			},
			onClickOriginalDeleteLinkBtn(linkId) {
				console.log(
					`++++++ [BrandProfileView.vue] onClickOriginalDeleteLinkBtn() ++++++`
				);
				document
					.getElementById("link-list")
					.removeChild(document.getElementById(`div-original-${linkId}`));
				this.delLinkIds.push(linkId);
				console.log(
					`❯❯❯❯❯❯ [BrandProfileView.vue] onClickOriginalDeleteLinkBtn() this.delLinkIds:`,
					this.delLinkIds
				);
			},
			selectImageFile(e) {
				console.log(`++++++ [BrandProfileView.vue] selecteImageFile() ++++++`);
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
			updateImage(file) {
				const profileImage = document.getElementById("profileImage");
				profileImage.src = "";
				profileImage.src = URL.createObjectURL(file);
			},
			async onClickEmailCheckBtn() {
				console.log(`[BrandProfileView.vue] onClickEmailCheckBtn()`);
				const email = document.getElementById("email").value;
				if (this.brandStore.brandProfile.user.email === email) {
					return;
				}
				const result = await this.userStore.checkEmailExists({ email });
				if (!result) {
					this.emailPossible = true;
					alert("사용할 수 있는 이메일입니다.");
				} else {
					alert("사용할 수 없는 이메일입니다.");
				}
			},
			async onClickUsernameCheckBtn() {
				console.log(`[BrandProfileView.vue] onClickUsernameCheckBtn()`);
				const username = document.getElementById("username").value;
				if (this.brandStore.brandProfile.user.username === username) {
					return;
				}
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