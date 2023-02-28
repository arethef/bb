<template>
	<div>
		<!-- <p>[LoginView.vue]</p> -->
		<div class="m-32"></div>
		<div class="grid grid-cols-6">
			<div class="col-span-1"></div>
			<div class="col-span-1">
				<div class="flex flex-col gap-4 m-4">
					<div class="text-2xl">Baked Club</div>
					<div class="text-2xl">Login</div>
				</div>
			</div>
			<div class="col-span-3">
				<div class="flex justify-center m-4">
					<login-form></login-form>
				</div>
			</div>
			<div class="col-span-1"></div>
		</div>
	</div>
</template>

<script>
	import CustomerLoginForm from "../components/login/CustomerLoginForm.vue";
	import BrandLoginForm from "../components/login/BrandLoginForm.vue";
	import LoginForm from "../components/login/LoginForm.vue";
	export default {
		components: { CustomerLoginForm, BrandLoginForm, LoginForm },
		data() {
			return {
				loginTarget: "Customer",
			};
		},
	};
</script>

<style>
</style>