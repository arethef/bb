<template>
  <div>
    <p>[LoginView.vue]</p>
    <div class="flex justify-center flex-row gap-4">
      <div class="basis-1/4" style="background-color: azure">
        <p>로그인에 쓰일 임잊이</p>
      </div>
      <div class="basis-2/4">
        <p>form</p>
        <div class="flex justify-center m-4">
          <login-form></login-form>
        </div>
      </div>
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