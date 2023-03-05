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
					<div class="flex flex-row items-center">
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
									to="/c/products"
									class="nav-link block pr-2 lg:px-2 py-2 text-bb-c hover:text-bb-bg focus:text-bb-bg transition duration-150 ease-in-out"
									>상품구경
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
						<div class="flex flex-row gap-2">
							<input
								type="text"
								name="nav-search"
								id="nav-search"
								class="text-xs rounded border-bb-bg text-bb-txt"
								placeholder="마켓/브랜드/상품"
								v-model="this.searchStr"
							/>
							<div
								class="flex items-center cursor-pointer"
								@click="onClickSearchIcon()"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#fffcf2"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
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
	import { useBookmarkStore } from "../../stores/bookmark";
	import { useCustomerStore } from "../../stores/customer";
	import { useSearchStore } from "../../stores/search";
	export default {
		components: { LogoutButton },
		setup() {
			const customerStore = useCustomerStore();
			const searchStore = useSearchStore();
			const bookmarkStore = useBookmarkStore();
			return { customerStore, searchStore, bookmarkStore };
		},
		data() {
			return {
				searchStr: "",
			};
		},
		async beforeCreate() {
			await this.bookmarkStore.loadCurrentBookmarks();
		},
		async created() {
			try {
				await this.customerStore.getCustomerProfile();
			} catch (err) {
				this.$router.push("/login");
			}
		},
		methods: {
			async onClickSearchIcon() {
				console.log(`++++++ [CustomerView.vue] onClickSearchIcon() ++++++`);
				if (this.searchStr) {
					console.log(
						`❯❯❯❯❯❯ [CustomerView.vue] onClickSearchIcon() this.searchStr:`,
						this.searchStr
					);
					await this.searchStore.loadSearchResult(this.searchStr);
					this.$router.push({
						name: "CustomerSearch",
						params: { searchStr: this.searchStr },
					});
				} else {
					alert("검색어를 입력해주세요");
				}
			},
			moveCustomerView() {
				this.$router.push("/c");
			},
		},
	};
</script>

<style>
</style>