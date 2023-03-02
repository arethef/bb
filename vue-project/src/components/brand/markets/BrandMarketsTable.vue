<template>
	<div>
		<!-- <p>[BrandMarketsTable.vue]</p> -->
		<div class="md:container md:mx-auto">
			<table class="min-w-full border text-center">
				<thead class="bg-gray-100">
					<tr class="border-b">
						<th scope="col" class="px-2 py-2 border-r">#</th>
						<th scope="col" class="px-2 py-2 border-r">마켓고유번호</th>
						<th scope="col" class="px-2 py-2 border-r">마켓제목</th>
						<th scope="col" class="px-2 py-2 border-r">마켓오픈일시</th>
						<th scope="col" class="px-2 py-2 border-r">마켓마감일시</th>
						<th scope="col" class="px-2 py-2 border-r">총준비수</th>
						<th scope="col" class="px-2 py-2 border-r">완판시가격</th>
						<th scope="col" class="px-2 py-2 border-r">총판매수</th>
						<th scope="col" class="px-2 py-2 border-r">총판매가격</th>
						<th scope="col" class="px-2 py-2 border-r">티켓수</th>
						<th scope="col" class="px-2 py-2">마감여부</th>
					</tr>
				</thead>
				<tbody class="bg-white">
					<tr
						v-for="(market, index) in this.marketStore
							.marketBrandAllTableMarkets"
						:key="market.id"
						@click="moveBrandMarketDetailView(market.market.id)"
						class="border-b cursor-pointer"
					>
						<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
							{{ index + 1 }}
						</th>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.market.un }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.market.title }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							<!-- {{ market.market.openDateTime }} -->
							{{ new Date(market.market.openDateTime).getFullYear() }}년{{
								new Date(market.market.openDateTime).getMonth() + 1
							}}월{{ new Date(market.market.openDateTime).getDate() }}일
							{{ new Date(market.market.openDateTime).getHours() }}시{{
								new Date(market.market.openDateTime).getMinutes()
							}}분{{ new Date(market.market.openDateTime).getSeconds() }}초
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							<!-- {{ market.market.closeDateTime }} -->
							{{ new Date(market.market.closeDateTime).getFullYear() }}년{{
								new Date(market.market.closeDateTime).getMonth() + 1
							}}월{{ new Date(market.market.closeDateTime).getDate() }}일
							{{ new Date(market.market.closeDateTime).getHours() }}시{{
								new Date(market.market.closeDateTime).getMinutes()
							}}분{{ new Date(market.market.closeDateTime).getSeconds() }}초
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.totalNumberOfPreparations }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.totalPriceSoldOut }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.totalNumberOfSales }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.totalPriceSelling }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.totalNumberOfTickets }}
						</td>
						<td class="px-2 py-2 whitespace-nowrap border-r">
							{{ market.done }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { useMarketStore } from "../../../stores/market";
	export default {
		setup() {
			const marketStore = useMarketStore();
			return { marketStore };
		},
		components: {},
		data() {
			return {};
		},
		async beforeCreate() {
			const brandAllTableMarkets =
				await this.marketStore.loadBrandAllTableMarkets();
			this.marketStore.setBrandAllTableMarkets(brandAllTableMarkets);
		},
		created() {},
		methods: {
			async moveBrandMarketDetailView(id) {
				await this.marketStore.detailMarket(id);
				await this.marketStore.setCurrentMarketId(id);
				this.$router.push({
					name: `BrandMarketDetail`,
					params: { marketId: id },
				});
			},
		},
	};
</script>

<style>
</style>