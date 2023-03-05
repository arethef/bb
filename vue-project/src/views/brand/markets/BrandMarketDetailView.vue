<template>
	<div>
		<!-- <p>[BrandMarketDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-3">
					<div class="border p-4">
						<label for="title" class="block">
							<span>제목</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.title }}
								</div>
							</div>
						</label>
						<label for="content" class="block mt-4">
							<span>내용</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.content }}
								</div>
							</div>
						</label>
						<label for="image" class="block mt-4">
							<span>마켓이미지</span>
							<div class="my-1">
								<div class="my-2">
									<img
										:src="`${this.marketStore.marketCurrentMarket.image.url}`"
									/>
								</div>
							</div>
						</label>
						<label for="deliveryFee" class="block mt-4">
							<span>배송비</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.deliveryFee }}
								</div>
							</div>
						</label>
						<label for="deliveryFeeAdded" class="block mt-4">
							<span>도서산간지역 추가 배송비</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.deliveryFeeAdded }}
								</div>
							</div>
						</label>
						<label for="deliveryFree" class="block mt-4">
							<span>무료배송</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.deliveryFree }}
								</div>
							</div>
						</label>
						<label for="minimumQuaytity" class="block mt-4">
							<span>최소주문수량</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ this.marketStore.marketCurrentMarket.minimumQuantity }}
								</div>
							</div>
						</label>
						<label for="openDateTime" class="block mt-4">
							<span>시작일시</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ open.getFullYear() }}년{{ open.getMonth() + 1 }}월{{
										open.getDate()
									}}일 {{ open.getHours() }}시{{ open.getMinutes() }}분{{
										open.getSeconds()
									}}초
								</div>
							</div>
						</label>
						<label for="closeDateTime" class="block mt-4">
							<span>마감일시</span>
							<div class="border-2 my-1">
								<div class="text-xs m-2">
									{{ close.getFullYear() }}년{{ close.getMonth() + 1 }}월{{
										close.getDate()
									}}일 {{ close.getHours() }}시{{ close.getMinutes() }}분{{
										close.getSeconds()
									}}초
								</div>
							</div>
						</label>
					</div>
				</div>
				<div class="col-span-9">
					<div class="flex flex-col gap-4">
						<div class="border p-4">
							<brand-market-detail-lineups-table
								:marketId="this.$props.marketId"
							></brand-market-detail-lineups-table>
						</div>
						<div class="border p-4">
							<brand-market-detail-orders-table
								:marketId="this.$props.marketId"
							></brand-market-detail-orders-table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BrandMarketDetailLineupsTable from "../../../components/brand/markets/BrandMarketDetailLineupsTable.vue";
	import BrandMarketDetailOrdersTable from "../../../components/brand/markets/BrandMarketDetailOrdersTable.vue";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	import { useTicketStore } from "../../../stores/ticket";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			const ticketStore = useTicketStore();
			return { marketStore, lineupStore, ticketStore };
		},
		components: { BrandMarketDetailLineupsTable, BrandMarketDetailOrdersTable },
		props: ["marketId"],
		data() {
			return {};
		},
		computed: {
			open() {
				return new Date(this.marketStore.marketCurrentMarket.openDateTime);
			},
			close() {
				return new Date(this.marketStore.marketCurrentMarket.closeDateTime);
			},
		},
		async beforeCreate() {
			await this.marketStore.detailMarket(this.$props.marketId);
			await this.lineupStore.loadLineups(this.$props.marketId);
			await this.ticketStore.loadBrandMarketDetailTickets(this.$props.marketId);
		},
		methods: {},
	};
</script>

<style>
</style>