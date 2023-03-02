<template>
	<div>
		<!-- <p>[CustomerView.vue]</p> -->
		<header>
			<div class="relative">
				<div class="absolute right-8 top-0">
					<div class="flex flex-row items-center gap-2">
						<p>
							{{ this.customerStore.customerProfile.nickname }}님 환영합니다
						</p>
						<logout-button target="customer"></logout-button>
					</div>
				</div>
			</div>
			<div class="flex justify-center m-8">
				<div>
					<button type="button" @click="moveCustomerView()">
						<div class="text-5xl font-bold">Baked Club</div>
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
									to="/c/markets"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>마켓구경
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/c/brands"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>브랜드구경
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/c/tickets"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>티켓내역
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/c/bookmarks"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>좋아요
								</RouterLink>
							</li>
							<li class="nav-item">
								<RouterLink
									to="/c/profile"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>내정보
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
	import { useCustomerStore } from "../../stores/customer";
	export default {
		components: { LogoutButton },
		setup() {
			const customerStore = useCustomerStore();
			return { customerStore };
		},
		data() {
			return {};
		},
		// created() {
		// 	this.customerStore.getCustomerProfile();
		// },
		async created() {
			try {
				await this.customerStore.getCustomerProfile();
			} catch (err) {
				this.$router.push("/login");
			}
		},
		methods: {
			moveCustomerView() {
				this.$router.push("/c");
			},
		},
	};
</script>

<style>
</style>