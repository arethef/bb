<template>
	<div>
		<!-- <p>[BrandTicketsTable.vue]</p> -->
		<div class="md:container md:mx-auto">
			<table class="min-w-full border text-center">
				<thead class="bg-gray-100">
					<tr class="border-b">
						<th scope="col" class="p-2 border-r">#</th>
						<th scope="col" class="p-2 border-r">티켓번호</th>
						<th scope="col" class="p-2 border-r">구매날짜</th>
						<th scope="col" class="p-2 border-r">구매자닉네임</th>
						<th scope="col" class="p-2 border-r">총수량</th>
						<th scope="col" class="p-2 border-r">총가격</th>
						<th scope="col" class="p-2">배송상태</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr
						v-for="(ticket, index) in this.ticketStore
							.ticketBrandAllTableTickets"
						:key="ticket.ticket.id"
						@click="moveBrandTicketDetailView(ticket.ticket.id)"
						class="border-b cursor-pointer"
					>
						<th scope="row" class="p-2 whitespace-nowrap border-r">
							{{ index + 1 }}
						</th>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.ticket.un }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							<!-- {{ ticket.ticket.createdAt }} -->
							{{ new Date(ticket.ticket.createdAt).getFullYear() }}년{{
								new Date(ticket.ticket.createdAt).getMonth() + 1
							}}월{{ new Date(ticket.ticket.createdAt).getDate() }}일
							{{ new Date(ticket.ticket.createdAt).getHours() }}시{{
								new Date(ticket.ticket.createdAt).getMinutes()
							}}분{{ new Date(ticket.ticket.createdAt).getSeconds() }}초
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.ticket.customer.nickname }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.ticket.totalQuantity }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.ticket.totalPrice }}
						</td>
						<td class="p-2 whitespace-nowrap">
							{{ ticket.ticket.deliveryStatus }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { useProductStore } from "../../../stores/product";
	import { useTicketStore } from "../../../stores/ticket";
	export default {
		setup() {
			const ticketStore = useTicketStore();
			const productStore = useProductStore();
			return { ticketStore, productStore };
		},
		components: {},
		data() {
			return {};
		},
		async beforeCreate() {
			const brandAllTableTickets =
				await this.ticketStore.loadBrandAllTableTickets();
			this.ticketStore.setBrandAllTableTickets(brandAllTableTickets);
		},
		created() {},
		methods: {
			async moveBrandTicketDetailView(id) {
				await this.ticketStore.detailTicket(id);
				this.ticketStore.setCurrentTicketId(id);
				await this.productStore.loadBrandTicketDetailProducts(id);
				this.$router.push({
					name: `BrandTicketDetail`,
					params: { ticketId: id },
				});
			},
		},
	};
</script>

<style>
</style>