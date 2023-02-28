<template>
	<div class="container mx-auto">
		<div class="flex justify-end mb-4">
			<!-- Button trigger modal -->
			<button
				type="button"
				class="inline-block px-4 py-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				data-te-toggle="modal"
				data-te-target="#marketNewConfirmModal"
				data-te-ripple-init
				data-te-ripple-color="light"
				@click="onClickMarketNewConfirmBtn"
			>
				확인하기
			</button>

			<!-- Start of Modal -->
			<div
				data-te-modal-init
				class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
				id="marketNewConfirmModal"
				tabindex="-1"
				data-te-backdrop="static"
				aria-labelledby="marketNewConfirmModalLabel"
				aria-hidden="true"
			>
				<!-- data-te-keyboard="false" -->
				<div
					data-te-modal-dialog-ref
					class="pointer-events-none relative h-[calc(100%-1rem)] w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[900px]"
				>
					<div
						class="p-6 pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
					>
						<!-- Start of Modal Header -->
						<div class="flex items-center justify-between">
							<h3 class="text-2xl">New Market</h3>
							<button
								type="button"
								class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
								data-te-modal-dismiss
								aria-label="Close"
							>
								<svg
									@click="closeMarketNewConfirmModal"
									xmlns="http://www.w3.org/2000/svg"
									class="w-8 h-8 text-bb-txt cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</div>
						<!-- Start of Modal Body -->
						<div class="relative overflow-y-auto mt-8">
							<div class="grid grid-cols-12 gap-4">
								<div class="col-span-4">
									<div class="border p-4">
										<label class="block col-span-4">
											<span class="">Title</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.title"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Content</span>
											<textarea
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.content"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Image</span>
											<div id="marketImagePreview" class="mt-1">
												<!-- 마켓 이미지 미리보기 -->
											</div>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Delivery Fee</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.deliveryFee"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Delivery Fee Added</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.deliveryFeeAdded"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Delivery Free</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.deliveryFree"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Minimum Quantity</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="reqCreateMarketDto.market.minimumQuantity"
												disabled
											/>
										</label>
									</div>
								</div>
								<div class="col-span-8">
									<div class="border p-4">
										<label class="block col-span-4">
											<span class="">Open Date Time</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="openDateTime"
												disabled
											/>
										</label>
										<label class="block col-span-4 mt-4">
											<span class="">Close Date Time</span>
											<input
												type="text"
												class="text-xs mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black"
												v-model="closeDateTime"
												disabled
											/>
										</label>
									</div>
									<div class="border p-4 mt-4">
										Lineup
										<table class="min-w-full border text-center">
											<thead class="bg-gray-100">
												<tr class="border-b">
													<th scope="col" class="px-2 border-r">#</th>
													<th scope="col" class="px-2 border-r">상품이름</th>
													<th scope="col" class="px-2 border-r">상품가격</th>
													<th scope="col" class="px-2 border-r">수량</th>
												</tr>
											</thead>
											<tbody>
												<tr
													v-for="(product, index) in this.productStore
														.productBrandMarketNewLineups"
													:key="product.product.id"
												>
													<th
														scope="row"
														class="px-2 whitespace-nowrap border-r"
													>
														{{ index + 1 }}
													</th>
													<td
														scope="row"
														class="px-2 whitespace-nowrap border-r"
													>
														{{ product.product.name }}
													</td>
													<td
														scope="row"
														class="px-2 whitespace-nowrap border-r"
													>
														{{ product.product.price }}
													</td>
													<td scope="row" class="px-2 whitespace-nowrap">
														{{ reqCreateMarketDto.lineups[product.product.id] }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<!-- Start Of Modal Footer -->
						<div class="mt-8 flex justify-end">
							<button
								@click="closeMarketNewConfirmModal"
								class="px-4 py-2 text-xs text-bb-b border border-bb-b rounded"
								data-te-modal-dismiss
								data-te-ripple-init
								data-te-ripple-color="light"
							>
								닫기
							</button>
							<button
								@click="onClickMarketNewCreateBtn"
								class="px-4 py-2 text-xs ml-2 text-bb-bg bg-bb-b rounded"
								data-te-ripple-init
								data-te-ripple-color="light"
							>
								마켓 생성하기
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- End of Modal -->
		</div>
	</div>
</template>

<script>
	import { useMarketStore } from "../../../stores/market";
	import { useProductStore } from "../../../stores/product";
	export default {
		setup() {
			const productStore = useProductStore();
			const marketStore = useMarketStore();
			return { productStore, marketStore };
		},
		components: {},
		props: {
			reqCreateMarketDto: {
				market: {
					title: "",
					content: "",
					deliveryFee: 0,
					deliveryFeeAdded: 0,
					deliveryFree: 0,
					minimumQuantity: 0,
					openDate: null,
					openTime: null,
					closeDate: null,
					closeTime: null,
				},
				image: {
					formData: null,
				},
				lineups: {},
			},
		},
		data() {
			return {
				isMarketNewConfirmModalOpen: false,
			};
		},
		computed: {
			isMarketNewConfirmModalVisible() {
				return this.isMarketNewConfirmModalOpen;
			},
			openDateTime() {
				return `${this.reqCreateMarketDto.market.openDate} ${this.reqCreateMarketDto.market.closeTime}:00`;
			},
			closeDateTime() {
				return `${this.reqCreateMarketDto.market.closeDate} ${this.reqCreateMarketDto.market.closeTime}:00`;
			},
		},
		created() {},
		methods: {
			onClickMarketNewConfirmBtn() {},
			async onClickMarketNewCreateBtn() {
				const result = await this.marketStore.createMarket(
					this.reqCreateMarketDto
				);
				this.$router.push({
					name: `BrandMarketDetail`,
					params: { marketId: result.id },
				});
			},
			openMarketNewConfirmModal() {
				console.log(
					`++++++ [BrandMarketNewConfirmModal.vue] openMarketNewConfirmModal() ++++++`
				);
				this.isMarketNewConfirmModalOpen = true;
				this.showMarketImage();
			},
			closeMarketNewConfirmModal() {
				this.isMarketNewConfirmModalOpen = false;
			},
			clearMarketImage() {
				document.getElementById("marketImagePreview").innerHTML = "";
			},
			showMarketImage() {
				this.clearMarketImage();
				const figure = document.createElement("figure");
				figure.classList.add("figure");
				figure.id = "figure";
				document.getElementById("marketImagePreview").appendChild(figure);
				const img = document.createElement("img");
				const file = this.reqCreateMarketDto.image.formData.get("imageFile");
				img.src = URL.createObjectURL(file);
				document.getElementById("figure").appendChild(img);
				const figcaption = document.createElement("figcaption");
				figcaption.classList.add("figure-caption");
				figcaption.innerHTML = `${file.name}`;
				document.getElementById("figure").appendChild(figcaption);
			},
		},
	};
</script>

<style>
</style>