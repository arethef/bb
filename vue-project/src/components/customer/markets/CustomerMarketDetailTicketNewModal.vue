<template>
	<div>
		<!-- <p>[CustomerMarketDetailTicketNewModal.vue]</p> -->
		<div class="flex justify-end">
			<button
				type="button"
				class="inline-block px-4 py-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
				data-te-toggle="modal"
				data-te-target="#marketDetailTicketNewContirmModal"
				data-te-ripple-init
				data-te-ripple-color="light"
				@click="onClickMarketDetailTicketNewConfirmBtn"
			>
				주문확인하기
			</button>
		</div>
		<!-- Start of Modal -->
		<div
			data-te-modal-init
			class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
			id="marketDetailTicketNewContirmModal"
			tabindex="-1"
			data-te-backdrop="static"
			aria-labelledby="marketDetailTicketNewContirmModalLabel"
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
						<h3 class="text-2xl">New Ticket</h3>
						<button
							type="button"
							class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
							data-te-modal-dismiss
							aria-label="Close"
						>
							<svg
								@click="closeMarketDetailTicketNewConfirmModal"
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
					<div class="relative overflow-y-auto mt-4 p-4">
						<div class="grid grid-cols-12 gap-4">
							<div class="col-span-4">
								<div class="border p-4">
									<div class="grid grid-flow-row gap-4">
										<div class="text-xl font-bold flex justify-center">
											{{
												this.marketStore.marketCurrentMarket.brand.businessName
											}}
										</div>
										<div class="">
											{{ this.marketStore.marketCurrentMarket.title }}
										</div>
										<div>
											<img
												:src="`${this.marketStore.marketCurrentMarket.image.url}`"
												alt=""
											/>
										</div>
										<div class="">
											{{ this.marketStore.marketCurrentMarket.content }}
										</div>
									</div>
								</div>
								<div
									v-if="addressInputFormVisible"
									class="border p-4 mt-4 flex flex-col gap-2"
								>
									<div class="flex flex-col gap-1">
										<label for="zipcode">우편번호</label>
										<input
											type="text"
											name="zipcode"
											id="zipcode"
											class="text-xs"
											v-model="this.place.zipcode"
										/>
									</div>
									<div class="flex flex-col gap-1">
										<label for="basic">주소</label>
										<input
											type="text"
											name="basic"
											id="basic"
											class="text-xs"
											v-model="this.place.basic"
										/>
									</div>
									<div class="flex flex-col gap-1">
										<label for="detail">상세주소</label>
										<input
											type="text"
											name="detail"
											id="detail"
											class="text-xs"
											v-model="this.place.detail"
										/>
									</div>
								</div>
								<div v-else class="border p-4 mt-4">
									<div class="flex flex-row gap-4 items-center relative">
										<div class="text-gray-700">배송지</div>
									</div>
									<div class="border-2 my-2">
										<div class="flex flex-row gap-4 items-center relative">
											<div class="text-xs m-2">
												{{
													`${this.customerStore.customerProfile.user.place.zipcode}) 
												${this.customerStore.customerProfile.user.place.basic}, 
												${this.customerStore.customerProfile.user.place.detail}`
												}}
											</div>
											<button
												class="absolute right-1"
												@click="this.addressInputFormVisible = true"
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
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="col-span-8">
								<div class="border p-4">
									<div class="grid grid-flow-row gap-4">
										<div
											v-for="(order, index) in this.productStore
												.productCustomerTicketNewOrders"
											:key="order.product.id"
										>
											<div class="flex flex-row gap-4">
												<div>#{{ index + 1 }}</div>
												<div>
													<img
														:src="`${order.product.image.url}`"
														style="max-width: 120px"
													/>
												</div>
												<div>
													<div>{{ order.product.name }}</div>
													<div>{{ order.product.price }}원</div>
													<div>
														{{ this.$props.orders[order.product.id] }}개
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="grid grid-flow-row mt-4 gap-2">
									<div class="flex justify-end">
										상품가격 합계:
										{{ this.reqCreateTicketDto.ticket.totalPrice }}
									</div>
									<div class="flex justify-end">
										배송비:
										{{
											this.reqCreateTicketDto.ticket.deliveryFreeApply
												? 0
												: this.marketStore.marketCurrentMarket.deliveryFee
										}}
									</div>
									<div></div>
									<div class="flex justify-end border-t pt-4">
										티켓가격:
										{{
											this.reqCreateTicketDto.ticket.totalPrice +
											(this.reqCreateTicketDto.ticket.deliveryFreeApply
												? 0
												: this.marketStore.marketCurrentMarket.deliveryFee)
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Start Of Modal Footer -->
					<div class="mt-8 flex justify-end">
						<button
							@click="closeMarketDetailTicketNewConfirmModal"
							class="px-4 py-2 text-xs text-bb-b border border-bb-b rounded"
							data-te-modal-dismiss
							data-te-ripple-init
							data-te-ripple-color="light"
						>
							닫기
						</button>
						<button
							@click="onClickMarketDetailTicketNewCreateBtn"
							class="px-4 py-2 text-xs ml-2 text-bb-bg bg-bb-b rounded"
							data-te-modal-dismiss
							data-te-ripple-init
							data-te-ripple-color="light"
						>
							빵티켓 사기
						</button>
					</div>
					<!-- End of Modal Footer -->
					<div id="payment-method"></div>
				</div>
			</div>
		</div>
		<!-- End of Modal -->
	</div>
</template>

<script>
	import { useCustomerStore } from "../../../stores/customer";
	import { useMarketStore } from "../../../stores/market";
	import { useOrderStore } from "../../../stores/order";
	import { useProductStore } from "../../../stores/product";
	import { useTicketStore } from "../../../stores/ticket";
	import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
	export default {
		setup() {
			const productStore = useProductStore();
			const marketStore = useMarketStore();
			const customerStore = useCustomerStore();
			const orderStore = useOrderStore();
			const ticketStore = useTicketStore();
			const testClientKey = "test_ck_qLlDJaYngroENKNBKOm3ezGdRpXx";
			return {
				productStore,
				marketStore,
				customerStore,
				orderStore,
				ticketStore,
				testClientKey,
			};
		},
		components: {},
		props: ["orders", "marketId"],
		data() {
			return {
				reqCreateTicketDto: {
					ticket: {
						// brandId: this.marketStore.marketCurrentMarket.brandId,
						marketId: this.$props.marketId,
						totalQuantity: this.$props.totalQuantity,
						totalPrice: this.$props.totalPrice,
						deliveryFreeApply: false,
						deliveryAddress: "",
					},
					orders: this.$props.orders,
				},
				place: {
					zipcode: "",
					basic: "",
					detail: "",
				},
				addressInputFormVisible:
					this.customerStore.customerProfile.user.place === undefined,
			};
		},
		computed: {},
		beforeCreate() {
			this.marketStore.detailMarket(this.$props.marketId);
		},
		created() {},
		methods: {
			async onClickMarketDetailTicketNewCreateBtn() {
				this.combineAndSetDeliveryAddress();
				const result = await this.ticketStore.createTicket(
					this.reqCreateTicketDto
				);
				console.log(
					`++++++ [CustomerMarketDetailTicketNewModal.vue] onClickMarketDetailTicketNewCreateBtn() ++++++`
				);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketDetailTicketNewModal.vue] onClickMarketDetailTicketNewCreateBtn() this.reqCreateTicketDto:`,
					this.reqCreateTicketDto
				);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketDetailTicketNewModal.vue] onClickMarketDetailTicketNewCreateBtn() this.marketStore.marketCurrentMarket:`,
					this.marketStore.marketCurrentMarket
				);
				console.log(
					`❯❯❯❯❯❯ [CustomerMarketDetailTicketNewModal.vue] onClickMarketDetailTicketNewCreateBtn() this.marketStore.marketCurrentMarket.brandId:`,
					this.marketStore.marketCurrentMarket.brandId
				);
				await this.ticketStore.detailTicket(result.id);
				try {
					await this.pay(result.un);
				} catch (e) {
					console.log(
						`❯❯❯❯❯❯ [CustomerMarketDetailTicketNewModal.vue] onClickMarketDetailTicketNewCreateBtn() e:`,
						e
					);
					// // 결제 실패 -> ticket 삭제하는 작업
					// await this.ticketStore.deleteTicket(result.id);
					// 결제 실패 -> ticket payStatus 변경
					await this.ticketStore.updatePayStatusFail(result.id);
					this.$router.push({
						name: `CustomerFail`,
						params: { marketId: this.$props.marketId },
					});
					// return;
				}
				// 결제 성공 -> ticket status 바꾸는 작업
				await this.ticketStore.updatePayStatusSuccess(result.id);
				this.$router.push({
					name: `CustomerTicketDetail`,
					params: { ticketId: result.id },
				});
			},
			async pay(orderId) {
				const paymentWidget = await loadPaymentWidget(
					this.testClientKey,
					ANONYMOUS
				);
				const paymentMethods = paymentWidget.renderPaymentMethods(
					"#payment-method",
					1
				);
				paymentWidget
					.requestPayment({
						// 결제 정보 파라미터
						orderId,
						// orderId: "AD8aZDpbzXs4EQa-UkIX6",
						orderName: `${
							this.productStore.productCustomerTicketNewOrders[0].product.name
						}외 ${
							this.productStore.productCustomerTicketNewOrders.length - 1
						} 건`,
						// successUrl: `http://127.0.0.1:5173/c/success`,
						// failUrl: "http://127.0.0.1:5173/c/fail",
						customerEmail: this.customerStore.customerProfile.user.email,
						customerName: this.customerStore.customerProfile.user.username,
					})
					.then(function (data) {
						// 결제 요청 성공 처리
					})
					.catch(function (error) {
						if (error.code === "USER_CANCEL") {
							// 결제 고객이 결제창을 닫았을 때 에러 처리
							alert("결제창을 닫아 결제가 취소되었습니다.");
						} else if (error.code === "INVALID_CARD_COMPANY") {
							// 유효하지 않은 카드 코드에 대한 에러 처리
							alert("유효하지 않은 카드입니다 ?");
						}
					});
			},
			combineAndSetDeliveryAddress() {
				if (!this.addressInputFormVisible) {
					this.reqCreateTicketDto.ticket.deliveryAddress = `${this.customerStore.customerProfile.user.place.zipcode}) ${this.customerStore.customerProfile.user.place.basic}, ${this.customerStore.customerProfile.user.place.detail}`;
				} else {
					this.reqCreateTicketDto.ticket.deliveryAddress = `${
						document.getElementById("zipcode").value
					}) ${document.getElementById("basic").value}, ${
						document.getElementById("detail").value
					}`;
				}
			},
			async onClickMarketDetailTicketNewConfirmBtn() {
				this.addressInputFormVisible =
					this.customerStore.customerProfile.user.place === undefined;
				const customerTicketNewOrders =
					await this.productStore.loadTicketNewOrders(this.$props.orders);
				this.productStore.setCustomerTicketNewOrders(customerTicketNewOrders);
				this.setTotalQuantityAndTotalPrice();
				this.setDeliveryFreeApply();
			},
			setDeliveryFreeApply() {
				if (
					this.reqCreateTicketDto.ticket.totalPrice >=
					this.marketStore.marketCurrentMarket.deliveryFree
				) {
					this.reqCreateTicketDto.ticket.deliveryFreeApply = true;
				} else {
					this.reqCreateTicketDto.ticket.deliveryFreeApply = false;
				}
			},
			setTotalQuantityAndTotalPrice() {
				this.reqCreateTicketDto.ticket.totalQuantity = 0;
				this.reqCreateTicketDto.ticket.totalPrice = 0;
				for (const product of this.productStore.productCustomerTicketNewOrders) {
					this.reqCreateTicketDto.ticket.totalQuantity += Number(
						this.$props.orders[product.product.id]
					);
					this.reqCreateTicketDto.ticket.totalPrice += Number(
						this.$props.orders[product.product.id] * Number(product.product.price)
					);
				}
			},
		},
	};
</script>

<style>
</style>
