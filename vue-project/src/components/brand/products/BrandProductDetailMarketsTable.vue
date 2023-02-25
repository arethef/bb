<template>
	<div>
		<p>[BrandProductDetailMarketsTable.vue]</p>
		<table class="min-w-full border text-center text-xs">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="font-medium px-6 py-2 border-r">#</th>
					<th scope="col" class="font-medium px-6 py-2 border-r">마켓번호</th>
					<th scope="col" class="font-medium px-6 py-2 border-r">마켓제목</th>
					<th scope="col" class="font-medium px-6 py-2 border-r">
						마켓오픈일시
					</th>
					<th scope="col" class="font-medium px-6 py-2 border-r">
						마켓마감일시
					</th>
					<th scope="col" class="font-medium px-6 py-2 border-r">티켓수</th>
					<th scope="col" class="font-medium px-6 py-2">마감여부</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<tr
					v-for="(market, index) in this.marketStore
						.marketBrandProductDetailMarkets"
					:key="market.market.id"
					class="border-b cursor-pointer"
				>
					<th scope="row" class="px-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</th>
					<td class="px-2 whitespace-nowrap border-r">
						{{ market.market.un }}
					</td>
					<td class="px-2 whitespace-nowrap border-r">
						{{ market.market.title }}
					</td>
					<td class="px-2 whitespace-nowrap border-r">
						{{ market.market.openDateTime }}
					</td>
					<td class="px-2 whitespace-nowrap border-r">
						{{ market.market.closeDateTime }}
					</td>
					<td class="px-2 whitespace-nowrap border-r">
						{{ market.totalNumberOfTickets }}
					</td>
					<td class="px-2 whitespace-nowrap border-r">
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