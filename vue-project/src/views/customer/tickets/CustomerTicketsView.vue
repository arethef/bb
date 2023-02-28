<template>
	<div>
		<!-- <p>[CustomerTicketsView.vue]</p> -->
		<customer-tickets-table></customer-tickets-table>
	</div>
</template>

<script>
	import CustomerTicketsTable from "../../../components/customer/tickets/CustomerTicketsTable.vue";
	export default {
		setup() {},
		components: { CustomerTicketsTable },
		data() {
			return {};
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>