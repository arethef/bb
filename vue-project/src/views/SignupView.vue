<template>
  <div>
    <p>[SignupView.vue]</p>
    <div class="flex justify-center flex-row gap-4">
      <div class="basis-1/4" style="background-color: azure">
        <p>회원가입에 쓰일 수 있는 이미지 ?</p>
      </div>
      <div class="basis-2/4">
        <p>form</p>
        <div class="grid grid-flow-col gap-4">
          <div class="flex justify-center gap-4">
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
                class="
                  form-check-label
                  cursor-pointer
                  px-2
                  py-1
                  rounded
                  select-none
                  peer-checked:bg-pink-300
                  peer-checked:font-bold
                  peer-checked:text-white
                "
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
                class="
                  form-check-label
                  cursor-pointer
                  px-2
                  py-1
                  rounded
                  select-none
                  peer-checked:bg-pink-300
                  peer=checked:font-bold
                  peer-checked:text-white
                "
                >Brand</label
              >
            </div>
          </div>
        </div>
        <div class="flex justify-center m-4">
          <customer-signup-form
            v-if="signupTarget === 'customer'"
          ></customer-signup-form>
          <brand-signup-form v-else></brand-signup-form>
        </div>
      </div>
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