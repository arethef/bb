<template>
	<div>
		<!-- <p>[BrandProductDetailMarketsTable.vue]</p> -->
		<table class="min-w-full border text-center">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="font-medium px-2 py-2 border-r">#</th>
					<!-- <th scope="col" class="font-medium px-2 py-2 border-r">마켓번호</th> -->
					<th scope="col" class="font-medium px-2 py-2 border-r">마켓제목</th>
					<th scope="col" class="font-medium px-2 py-2 border-r">
						마켓오픈일시
					</th>
					<th scope="col" class="font-medium px-2 py-2 border-r">
						마켓마감일시
					</th>
					<th scope="col" class="font-medium px-2 py-2 border-r">티켓수</th>
					<th scope="col" class="font-medium px-2 py-2">마감여부</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<tr
					v-for="(market, index) in this.marketStore
						.marketBrandProductDetailMarkets"
					:key="market.market.id"
					class="border-b cursor-pointer"
				>
					<th scope="row" class="px-2 py-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</th>
					<!-- <td class="px-2 py-2 whitespace-nowrap border-r">
						{{ market.market.un }}
					</td> -->
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
						{{ market.totalNumberOfTickets }}
					</td>
					<td class="px-2 py-2 whitespace-nowrap border-r">
						{{ market.done }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { useMarketStore } from "@/stores/market";
	export default {
		setup() {
			const marketStore = useMarketStore();
			return { marketStore };
		},
		props: ["productId"],
		async beforeCreate() {
			const brandProductDetailMarkets =
				await this.marketStore.loadBrandProductDetailMarkets(
					this.$props.productId
				);
			this.marketStore.setBrandProductDetailMarkets(brandProductDetailMarkets);
		},
	};
</script>

<style>
</style>