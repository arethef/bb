<template>
	<div>
		<main>
			<!-- <p>[HomeView.vue]</p> -->
			<div class="m-32"></div>
			<div class="grid grid-cols-4">
				<div class="col-span-1"></div>
				<div class="col-span-1">
					<div class="flex flex-col gap-4">
						<div class="text-2xl">Welcome</div>
						<div class="text-2xl">To</div>
						<div class="text-4xl font-bold">Baked Club</div>
					</div>
				</div>
				<div class="col-span-1">
					<div class="flex flex-row justify-center gap-8">
						<div>
							<button
								class="inline-block px-4 py-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							>
								<RouterLink to="/login">Login</RouterLink>
							</button>
						</div>
						<div>
							<button
								class="inline-block px-4 py-2 bg-bb-b text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-bb-a hover:shadow-lg active:bg-bb-a1 active:shadow-lg transition duration-150 ease-in-out"
							>
								<RouterLink to="/signup">Signup</RouterLink>
							</button>
						</div>
					</div>
				</div>
				<div class="col-span-1"></div>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		created() {
			// console.log(import.meta.env);
		},
	};
</script>