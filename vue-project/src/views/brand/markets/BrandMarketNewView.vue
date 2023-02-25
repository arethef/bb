<template>
	<div>
		<p>[BrandMarketNewView.vue]</p>
		<div class="md:container md:mx-auto">
			<div class="flex justify-end">
				<brand-market-new-confirm-modal
					:reqCreateMarketDto="reqCreateMarketDto"
				></brand-market-new-confirm-modal>
			</div>
			<div class="flex justify-center flex-row gap-4">
				<div class="basis-2/5">
					<p>사용자가 직접 입력해야하는 것들</p>
					<!--          title content image-->
					<!--          deliveryFee deliveryFeeAdded deliveryFree minimumQuantity-->
					<!--          openDateTime closeDateTime-->
					<!--          !lineups(종류+수량)-->
					<div class="border mt-4 p-4">
						<div class="grid grid-cols-1 gap-4">
							<label for="title" class="block form-label">
								<span class="">Title</span>
								<input
									id="title"
									type="text"
									class="mt-1 block form-input w-full text-xs"
									placeholder="1차빵마켓 제목이다"
									v-model="reqCreateMarketDto.market.title"
								/>
							</label>
							<label for="content" class="block form-label">
								<span class="">Content</span>
								<textarea
									id="content"
									type="text"
									class="mt-1 block form-input w-full text-xs"
									placeholder="1차빵마켓 내용이다"
									v-model="reqCreateMarketDto.market.content"
								/>
							</label>
							<label for="imageFile" class="block form-label">
								<span class="">Image</span>
								<input
									id="imageFile"
									type="file"
									accept="image/*"
									class="mt-1 block form-control w-full text-xs"
									@change="selectImageFile"
								/>
								<div id="marketImagePreview" class="mt-1">
									<!-- <p>마켓 이미지 미리보기</p> -->
								</div>
							</label>
							<label for="deliveryFee" class="block form-label">
								<span class="">Delivery Fee</span>
								<input
									id="deliveryFee"
									type="number"
									class="mt-1 block form-input w-full text-xs"
									placeholder=""
									v-model="reqCreateMarketDto.market.deliveryFee"
								/>
							</label>
							<label for="deliveryFeeAdded" class="block form-label">
								<span class="">Delivery Fee Added</span>
								<input
									id="deliveryFeeAdded"
									type="number"
									class="mt-1 block form-input w-full text-xs"
									placeholder=""
									v-model="reqCreateMarketDto.market.deliveryFeeAdded"
								/>
							</label>
							<label for="deliveryFree" class="block form-label">
								<span class="">Delivery Free</span>
								<input
									id="deliveryFree"
									type="number"
									class="mt-1 block form-input w-full text-xs"
									placeholder=""
									v-model="reqCreateMarketDto.market.deliveryFree"
								/>
							</label>
							<label for="minimumQuantity" class="block form-label">
								<span class="">Minimum Quantity</span>
								<input
									id="minimumQuantity"
									type="number"
									class="mt-1 block form-input w-full text-xs"
									placeholder=""
									v-model="reqCreateMarketDto.market.minimumQuantity"
								/>
							</label>
							<label for="openDate" class="block form-label">
								<span class="">Open Date Time</span>
								<div class="grid grid-flow-col gap-4">
									<input
										id="openDate"
										type="date"
										class="mt-1 block form-input w-full text-xs"
										v-model="reqCreateMarketDto.market.openDate"
									/>
									<input
										id="openTime"
										type="time"
										class="mt-1 block form-input w-full text-xs"
										v-model="reqCreateMarketDto.market.openTime"
									/>
								</div>
							</label>
							<label for="closeDate" class="block form-label">
								<span class="">Close Date Time</span>
								<div class="grid grid-flow-col gap-4">
									<input
										id="closeDate"
										type="date"
										class="mt-1 block form-input w-full text-xs"
										v-model="reqCreateMarketDto.market.closeDate"
									/>
									<input
										id="closeTime"
										type="time"
										class="mt-1 block form-input w-full text-xs"
										v-model="reqCreateMarketDto.market.closeTime"
									/>
								</div>
							</label>
						</div>
					</div>
				</div>
				<div class="basis-3/5">
					<p>상품이 포함된 마켓 리스트</p>
					<div class="border mt-4 mb-4 p-4">
						Lineup
						<div class="overflow-y-auto">
							<brand-market-new-products-table
								@brandMarketNewLineup="selectedBrandMarketNewProducts"
							></brand-market-new-products-table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useMarketStore } from "../../../stores/market";
	import { useImageStore } from "../../../stores/image";
	import { useProductStore } from "../../../stores/product";
	import BrandMarketNewProductsTable from "../../../components/brand/markets/BrandMarketNewProductsTable.vue";
	import BrandMarketNewConfirmModal from "../../../components/brand/markets/BrandMarketNewConfirmModal.vue";

	export default {
		setup() {
			const marketStore = useMarketStore();
			const imageStore = useImageStore();
			const productStore = useProductStore();
			return { marketStore, imageStore, productStore };
		},
		components: { BrandMarketNewProductsTable, BrandMarketNewConfirmModal },
		data() {
			return {
				reqCreateMarketDto: {
					market: {
						title: "1차 빵마켓 제목",
						content: "1차 빵마켓 내용",
						deliveryFee: 0,
						deliveryFeeAdded: 0,
						deliveryFree: 0,
						minimumQuantity: 0,
						openDate: "2023-02-20",
						openTime: "15:15",
						closeDate: "2023-02-21",
						closeTime: "14:14",
					},
					image: {
						formData: null,
					},
					lineups: {},
				},
			};
		},
		// async beforeCreate() {
		// 	console.log(`++++++ [BrandMarketNewView.vue] beforeCreated() ++++++`);
		// 	const brandMarketNewProducts =
		// 		await this.productStore.loadMarketNewProducts();
		// 	this.productStore.setBrandMarketNewProducts(brandMarketNewProducts);
		// 	console.log(
		// 		`❯❯❯❯❯❯ [BrandMarketNewView.vue] beforeCreated() brandMarketNewProducts:`,
		// 		brandMarketNewProducts
		// 	);
		// },
		methods: {
			selectedBrandMarketNewProducts(lineups) {
				console.log(
					`++++++ [BrandMarketNewView.vue] selectedBrandMarketNewProducts() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewView.vue] selectedBrandMarketNewProducts() lineups:`,
					lineups
				);
				this.reqCreateMarketDto.lineups = lineups;
				console.log(
					`❯❯❯❯❯❯ [BrandMarketNewView.vue] selectedBrandMarketNewProducts() this.lineups:`,
					this.reqCreateMarketDto.lineups
				);
			},
			selectImageFile(e) {
				if (!e) {
					return;
				}
				const files = e.target.files;
				if (files.length > 0) {
					const formData = new FormData();
					formData.append("imageFile", files[0]);
					this.reqCreateMarketDto.image.formData = formData;
					this.showMarketImage(files[0]);
				} else {
					this.clearMarketImage();
				}
			},
			showMarketImage(file) {
				this.clearMarketImage();
				const figure = document.createElement("figure");
				figure.classList.add("figure");
				figure.id = "figure";
				document.getElementById("marketImagePreview").appendChild(figure);
				const img = document.createElement("img");
				img.src = URL.createObjectURL(file);
				// img.style = `width:100px; height:100px`
				document.getElementById("figure").appendChild(img);
				const figcaption = document.createElement("figcaption");
				figcaption.classList.add("figure-caption");
				figcaption.innerHTML = `${file.name}`;
				document.getElementById("figure").append(figcaption);
			},
			clearMarketImage() {
				document.getElementById("marketImagePreview").innerHTML = "";
			},
			// checkLineupProductIds() {
			// 	console.log(
			// 		`++++++ [BrandMarketNewView.vue] checkLineupProductIds() ++++++`
			// 	);
			// 	console.log(
			// 		`❯❯❯❯❯❯ [BrandMarketNewView.vue] checkLineupProductIds() this.lineupsProductIds:`,
			// 		this.lineupsProductIds
			// 	);
			// },
		},
	};
</script>

<style></style>
