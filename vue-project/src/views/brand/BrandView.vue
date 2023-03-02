<template>
	<div>
		<!-- <p>[BrandView.vue]</p> -->
		<header>
			<div class="relative">
				<div class="absolute right-8 top-0">
					<logout-button target="brand"></logout-button>
				</div>
			</div>
			<div class="flex justify-center m-8">
				<div>
					<button type="button" @click="moveBrandView()">
						<div class="text-5xl font-bold">
							{{ this.brandStore.brandProfile.businessName }}
						</div>
					</button>
				</div>
			</div>
			<nav
				class="navbar navbar-expand-lg shadow-md py-2 bg-bb-b relative flex items-center w-full justify-between"
			>
				<div class="md:container md:mx-auto">
					<div class="">
						<ul class="navbar-nav mr-auto lg:flex lg:flex-row ml-4">
							<li class="nav-item">
								<RouterLink
									to="/b/tickets"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>티켓내역
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/b/products"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>판매상품
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/b/markets"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>마켓
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/b/profile"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>브랜드정보
								</RouterLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
		<div class="m-8">
			<RouterView />
		</div>
	</div>
</template>

<script>
	import LogoutButton from "../../components/logout/LogoutButton.vue";
	import { useBrandStore } from "../../stores/brand";
	export default {
		components: { LogoutButton },
		setup() {
			const brandStore = useBrandStore();
			return { brandStore };
		},
		data() {
			return {};
		},
		// created() {
		// 	this.brandStore.getBrandProfile();
		// },
		async created() {
			try {
				await this.brandStore.getBrandProfile();
			} catch (err) {
				this.$router.push("/login");
			}
		},
		methods: {
			moveBrandView() {
				this.$router.push("/b");
			},
		},
	};
</script>

<style>
</style>