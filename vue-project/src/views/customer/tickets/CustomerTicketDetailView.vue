<template>
	<div>
		<!-- <p>[CustomerTicketDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="my-12 grid grid-cols-4">
				<div class="col-span-1"></div>
				<div class="col-span-2">
					<div class="flex flex-col gap-8">
						<div class="text-3xl font-bold">
							TICKET BY
							{{
								this.ticketStore.ticketCurrentTicket.market.brand.businessName
							}}
						</div>
						<div class="border border-bb-txt"></div>
						<div class="flex flex-row gap-12">
							<div>티켓</div>
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-4">
									<div>티켓번호 |</div>
									<div>{{ this.ticketStore.ticketCurrentTicket.un }}</div>
								</div>
								<div class="flex flex-row gap-4">
									<div>구매일시 |</div>
									<div>
										{{ ticketCreatedAt.getFullYear() }}년{{
											ticketCreatedAt.getMonth() + 1
										}}월{{ ticketCreatedAt.getDate() }}일
										{{ ticketCreatedAt.getHours() }}시{{
											ticketCreatedAt.getMinutes()
										}}분{{ ticketCreatedAt.getSeconds() }}초
									</div>
								</div>
							</div>
						</div>
						<div class="border border-bb-txt"></div>
						<div class="flex flex-row gap-12">
							<div>배송</div>
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-4">
									<div>배송지 |</div>
									<div>
										{{ this.ticketStore.ticketCurrentTicket.deliveryAddress }}
									</div>
								</div>
							</div>
						</div>
						<div class="border border-bb-txt"></div>
						<div class="flex flex-row gap-12">
							<div>상품</div>
							<div class="flex flex-col gap-4">
								<div class="mb-4 flex flex-col gap-4">
									<div
										v-for="order in this.orderStore.orderCurrentOrders"
										:key="order.id"
										class="flex flex-row gap-4 border border-bb-txt p-4"
									>
										<div>
											<img
												:src="order.product.image.url"
												style="height: 100px; width: 100px"
											/>
										</div>
										<div class="flex flex-col gap-1">
											<div>{{ order.product.name }}</div>
											<div>{{ order.product.price }}</div>
											<div>{{ order.quantity }}개</div>
										</div>
									</div>
								</div>
								<div class="border border-bb-txt"></div>
								<div class="flex flex-col gap-1 mt-4">
									<div class="flex flex-row gap-4">
										<div>총수량 |</div>
										<div>
											{{
												this.orderStore.orderCurrentOrders.reduce(
													(acc, order, idx, _) => acc + Number(order.quantity),
													0
												)
											}}개
										</div>
									</div>
									<div class="flex flex-row gap-4">
										<div>총가격 |</div>
										<div>
											{{
												this.orderStore.orderCurrentOrders.reduce(
													(acc, order, idx, _) =>
														acc +
														Number(order.quantity) *
															Number(order.product.price),
													0
												)
											}}원
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="border border-bb-txt"></div>
						<div class="flex flex-row gap-12">
							<div>결제</div>
							<div class="flex flex-col gap-1">
								<div class="flex flex-row gap-4">
									<div>총가격 |</div>
									<div>
										{{
											this.orderStore.orderCurrentOrders.reduce(
												(acc, order, idx, _) =>
													acc +
													Number(order.quantity) * Number(order.product.price),
												0
											)
										}}원
									</div>
								</div>
								<div class="flex flex-row gap-4">
									<div>배송비 |</div>
									<div>
										{{
											this.ticketStore.ticketCurrentTicket.deliveryFreeApply
												? 0
												: this.ticketStore.ticketCurrentTicket.market
														.deliveryFee
										}}원
									</div>
								</div>
								<div class="flex flex-row gap-4">
									<div>결제금액 |</div>
									<div>
										{{
											Number(
												this.orderStore.orderCurrentOrders.reduce(
													(acc, order, idx, _) =>
														acc +
														Number(order.quantity) *
															Number(order.product.price),
													0
												)
											) +
											Number(
												this.ticketStore.ticketCurrentTicket.deliveryFreeApply
													? 0
													: this.ticketStore.ticketCurrentTicket.market
															.deliveryFee
											)
										}}원
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-1"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useOrderStore } from "../../../stores/order";
	import { useProductStore } from "../../../stores/product";
	import { useTicketStore } from "../../../stores/ticket";
	export default {
		setup() {
			const ticketStore = useTicketStore();
			const productStore = useProductStore();
			const orderStore = useOrderStore();
			return { ticketStore, productStore, orderStore };
		},
		components: {},
		props: ["ticketId"],
		computed: {
			ticketCreatedAt() {
				return new Date(this.ticketStore.ticketCurrentTicket.createdAt);
			},
		},
		data() {
			return {};
		},
		async beforeCreate() {
			await this.ticketStore.detailTicket(this.$props.ticketId);
			await this.productStore.loadCustomerTicketDetailProducts(
				this.$props.ticketId
			);
			await this.orderStore.loadCustomerTicketDetailOrders(this.$props.ticketId);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>