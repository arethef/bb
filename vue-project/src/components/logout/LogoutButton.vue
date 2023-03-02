<template>
	<div>
		<div>
			<button
				class="px-2 py-1 text-bb-b bg-white border-2 font-medium text-xs leading-tight rounded shadow-md hover:text-white hover:bg-bb-a hover:shadow-lg transition duration-150 ease-in-out"
				type="button"
				@click="onClickLogoutBtn()"
			>
				로그아웃
			</button>
		</div>
	</div>
</template>

<script>
	import { useUserStore } from "@/stores/user";
	import { useBrandStore } from "../../stores/brand";
	import { useCustomerStore } from "../../stores/customer";
	export default {
		setup() {
			const userStore = useUserStore();
			const brandStore = useBrandStore();
			const customerStore = useCustomerStore();
			return { userStore, brandStore, customerStore };
		},
		components: {},
		props: ["target"],
		data() {
			return {};
		},
		created() {},
		methods: {
			async onClickLogoutBtn() {
				switch (this.$props.target) {
					case "brand":
						await this.brandStore.brandLogout();
						break;
					case "customer":
						await this.customerStore.customerLogout();
						break;
				}
				this.$router.push("/");
			},
		},
	};
</script>

<style>
</style>