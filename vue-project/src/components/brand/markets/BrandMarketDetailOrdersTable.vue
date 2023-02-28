<template>
	<div>
		<!-- <p>[BrandMarketDetailOrdersTable.vue]</p> -->
		<table class="min-w-full border text-center">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="px-2 py-2 border-r">#</th>
					<th scope="col" class="px-2 py-2 border-r">티켓번호</th>
					<th scope="col" class="px-2 py-2 border-r">구매자닉네임</th>
					<th scope="col" class="px-2 py-2 border-r">총수량</th>
					<th scope="col" class="px-2 py-2 border-r">총가격</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<tr
					v-for="(ticket, index) in this.ticketStore
						.ticketBrandMarketDetailTickets"
					:key="ticket.ticket.id"
				>
					<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</td>
					<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ ticket.ticket.un }}
					</td>
					<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ ticket.ticket.customer.nickname }}
					</td>
					<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ ticket.ticket.totalQuantity }}
					</td>
					<td scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ ticket.ticket.totalPrice }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { useTicketStore } from "@/stores/ticket";
	export default {
		setup() {
			const ticketStore = useTicketStore();
			return { ticketStore };
		},
		components: {},
		props: ["marketId"],
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>