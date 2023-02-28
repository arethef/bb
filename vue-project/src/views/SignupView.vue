<template>
	<div>
		<!-- <p>[SignupView.vue]</p> -->
		<div class="m-32"></div>
		<div class="grid grid-cols-6">
			<div class="col-span-1"></div>
			<div class="col-span-1">
				<div class="flex flex-col gap-4 m-4">
					<div class="text-2xl">Baked Club</div>
					<div class="text-2xl">Signup</div>
				</div>
			</div>
			<div class="col-span-3">
				<div class="flex justify-center m-4">
					<div class="grid grid-flow-col gap-4">
						<div class="form-check form-check-inline">
							<input
								type="radio"
								name="signupTarget"
								id="customer"
								class="peer hidden form-check-input"
								autocomplete="off"
								value="customer"
								v-model="signupTarget"
								checked
							/>
							<label
								for="customer"
								class="form-check-label cursor-pointer px-4 py-2 rounded select-none border-2 border-pink-300 font-bold text-pink-300 peer-checked:bg-pink-300 peer-checked:font-bold peer-checked:text-white"
								>Customer</label
							>
						</div>
						<div class="form-check form-check-inline">
							<input
								type="radio"
								name="signupTarget"
								id="brand"
								class="peer hidden form-check-input"
								autocomplete="off"
								value="brand"
								v-model="signupTarget"
							/>
							<label
								for="brand"
								class="form-check-label cursor-pointer px-4 py-2 rounded select-none border-2 border-pink-300 font-bold text-pink-300 peer-checked:bg-pink-300 peer-checked:font-bold peer-checked:text-white"
								>Brand</label
							>
						</div>
					</div>
				</div>
				<div class="flex justify-center m-8">
					<customer-signup-form
						v-if="signupTarget === 'customer'"
					></customer-signup-form>
					<brand-signup-form v-else></brand-signup-form>
				</div>
			</div>
			<div class="col-span-1"></div>
		</div>
	</div>
</template>

<script>
	import CustomerSignupForm from "../components/signup/CustomerSignupForm.vue";
	import BrandSignupForm from "../components/signup/BrandSignupForm.vue";
	export default {
		components: { CustomerSignupForm, BrandSignupForm },
		data() {
			return {
				signupTarget: "customer",
			};
		},
	};
</script>

<style>
</style>