<template>
	<div>
		<p>[BrandMarketDetailLinupsTable.vue]</p>
		<table class="min-w-full border text-center">
			<thead class="bg-gray-100">
				<tr class="border-b">
					<th scope="col" class="px-2 border-r">#</th>
					<th scope="col" class="px-2 border-r">상품이름</th>
					<th scope="col" class="px-2 border-r">상품사진</th>
					<th scope="col" class="px-2 border-r">상품가격</th>
					<th scope="col" class="px-2 border-r">수량</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<tr
					v-for="(lineup, index) in this.lineupStore.lineupCurrentLineups"
					:key="lineup.product.id"
				>
					<td scope="row" class="px-2 whitespace-nowrap border-r">
						{{ index + 1 }}
					</td>
					<td scope="row" class="px-2 whitespace-nowrap border-r">
						{{ lineup.product.name }}
					</td>
					<td scope="row" class="px-2 whitespace-nowrap border-r">
						<img
							:src="`${lineup.product.image.url}`"
							style="max-width: 100px"
							alt=""
						/>
					</td>
					<td scope="row" class="px-2 whitespace-nowrap border-r">
						{{ lineup.product.price }}
					</td>
					<td scope="row" class="px-2 whitespace-nowrap border-r">
						{{ lineup.quantity }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { useLineupStore } from "../../../stores/lineup";
	export default {
		setup() {
			const lineupStore = useLineupStore();
			return { lineupStore };
		},
		components: {},
		props: ["marketId"],
		data() {
			return {};
		},
		async beforeCreate() {
			await this.lineupStore.loadLineups(this.$props.marketId);
		},
		created() {},
		methods: {},
	};
</script>

<style>
</style>