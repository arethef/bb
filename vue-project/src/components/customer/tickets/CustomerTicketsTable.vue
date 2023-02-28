<template>
	<div>
		<!-- <p>[CustomerTicketsTable.vue]</p> -->
		<div class="md:container md:mx-auto">
			<table class="min-w-full border text-center">
				<thead class="bg-gray-100">
					<tr class="border-b">
						<th scope="col" class="p-2 border-r">#</th>
						<th scope="col" class="p-2 border-r">티켓고유번호</th>
						<th scope="col" class="p-2 border-r">구매날짜</th>
						<th scope="col" class="p-2 border-r">브랜드이름</th>
						<th scope="col" class="p-2 border-r">마켓제목</th>
						<th scope="col" class="p-2 border-r">총수량</th>
						<th scope="col" class="p-2 border-r">총가격</th>
						<th scope="col" class="p-2">배송상태</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr
						v-for="(ticket, index) in this.ticketStore.ticketCustomerTickets"
						:key="ticket.id"
						@click="moveCustomerTicketDetailView(ticket.id)"
						class="border-b cursor-pointer"
					>
						<th scope="row" class="p-2 whitespace-nowrap border-r">
							{{ index + 1 }}
						</th>
						<td class="p-2 whitespace-nowrap border-r">{{ ticket.un }}</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.createdAt }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.brand.businessName }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.market.title }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.totalQuantity }}
						</td>
						<td class="p-2 whitespace-nowrap border-r">
							{{ ticket.totalPrice }}
						</td>
						<td class="p-2 whitespace-nowrap">{{ ticket.deliveryStatus }}</td>
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
		async beforeCreate() {
			const customerTickets = await this.ticketStore.loadCustomerTickets();
			this.ticketStore.setCustomerTickets(customerTickets);
		},
		methods: {
			async moveCustomerTicketDetailView(id) {
				await this.ticketStore.detailTicket(id);
				this.ticketStore.setCurrentTicketId(id);
				await this.productStore.loadCustomerTicketDetailProducts(id);
				this.$router.push({
					name: `CustomerTicketDetail`,
					params: { ticketId: id },
				});
			},
		},
	};
</script>

<style>
</style>