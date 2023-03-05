<template>
	<div>
		<!-- <p>[CustomerMarketDetailView.vue]</p> -->
		<div class="md:container md:mx-auto">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-3">
					<div class="border p-4 grid gap-4">
						<div class="flex flex-col justify-center">
							<div class="text-base font-bold text-center">
								{{ this.marketStore.marketCurrentMarket.brand.businessName }}
							</div>
							<div class="my-1">
								<div class="my-2">
									<div class="grid grid-cols-3">
										<div class="col-span-1"></div>
										<div class="col-span-1">
											<img
												:src="`${this.marketStore.marketCurrentMarket.brand.user.image.url}`"
											/>
										</div>
										<div class="col-span-1"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="font-bold">
							{{ this.marketStore.marketCurrentMarket.title }}
						</div>
						<div>
							<img :src="`${this.marketStore.marketCurrentMarket.image.url}`" />
						</div>
						<div>
							{{ this.marketStore.marketCurrentMarket.content }}
						</div>
						<div class="flex flex-col gap-1 text-xs text-gray-400">
							<div class="">
								배송비 |
								{{ this.marketStore.marketCurrentMarket.deliveryFee }}
							</div>
							<div class="">
								도서산간지역 추가 배송비 |
								{{ this.marketStore.marketCurrentMarket.deliveryFeeAdded }}
							</div>
							<div class="">
								무료배송 |
								{{ this.marketStore.marketCurrentMarket.deliveryFree }}원 이상
								구매시
							</div>
							<div class="">
								최소주문수량 |
								{{ this.marketStore.marketCurrentMarket.minimumQuantity }}
							</div>
						</div>
						<div class="flex flex-col gap-1">
							<div>
								시작일시 |
								{{ open.getFullYear() }}년{{ open.getMonth() + 1 }}월{{
									open.getDate()
								}}일 {{ open.getHours() }}시{{ open.getMinutes() }}분{{
									open.getSeconds()
								}}초
							</div>
							<div>
								마감일시 |
								{{ close.getFullYear() }}년{{ close.getMonth() + 1 }}월{{
									close.getDate()
								}}일 {{ close.getHours() }}시{{ close.getMinutes() }}분{{
									close.getSeconds()
								}}초
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-9">
					<div>
						<customer-market-detail-lineups-table
							:marketId="this.$props.marketId"
						></customer-market-detail-lineups-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CustomerMarketDetailLineupsTable from "../../../components/customer/markets/CustomerMarketDetailLineupsTable.vue";
	import { useLineupStore } from "../../../stores/lineup";
	import { useMarketStore } from "../../../stores/market";
	export default {
		setup() {
			const marketStore = useMarketStore();
			const lineupStore = useLineupStore();
			return { marketStore, lineupStore };
		},
		components: {
			CustomerMarketDetailLineupsTable,
		},
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
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>