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
					<div class="relative overflow-y-auto mt-8">
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
								<div class="border p-4 mt-4">
									<span class="text-gray-700">배송지</span>
									<div class="border-2 my-1">
										<div class="text-xs m-2">
											{{ this.reqCreateTicketDto.ticket.deliveryAddress }}
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
	export default {
		setup() {
			const productStore = useProductStore();
			const marketStore = useMarketStore();
			const customerStore = useCustomerStore();
			const orderStore = useOrderStore();
			const ticketStore = useTicketStore();
			return {
				productStore,
				marketStore,
				customerStore,
				orderStore,
				ticketStore,
			};
		},
		components: {},
		props: ["orders", "marketId"],
		data() {
			return {
				reqCreateTicketDto: {
					ticket: {
						brandId: this.marketStore.marketCurrentMarket.brandId,
						marketId: this.$props.marketId,
						totalQuantity: this.$props.totalQuantity,
						totalPrice: this.$props.totalPrice,
						deliveryFreeApply: false,
						deliveryAddress: "광안리",
					},
					orders: this.$props.orders,
				},
			};
		},
		computed: {},
		beforeCreate() {
			this.marketStore.detailMarket(this.$props.marketId);
		},
		created() {},
		methods: {
			async onClickMarketDetailTicketNewCreateBtn() {
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
				this.$router.push({
					name: `CustomerTicketDetail`,
					params: { ticketId: result.id },
				});
			},
			async onClickMarketDetailTicketNewConfirmBtn() {
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
