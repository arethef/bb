<template>
  <div>
    <div class="border p-4">
      <p>[CustomersignupForm.vue]</p>
      <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
        <div class="col-span-1 grid gap-1 m-1">
          <div class="p-1">
            <label for="email" class="block">이메일</label>
          </div>
          <div class="p-1">
            <label for="password" class="block">비밀번호</label>
          </div>
          <div class="p-1">
            <label for="passwordCheck" class="block">비밀번호확인</label>
          </div>
          <div class="p-1">
            <label for="username" class="block">사용자이름</label>
          </div>
          <div class="p-1">
            <label for="nickname" class="block">닉네임</label>
          </div>
        </div>
        <div class="col-span-3 grid gap-1 m-1">
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="email"
              id="email"
              class="col-span-7 form-input block text-xs"
              placeholder="bbang@example.com"
              v-model="reqCustomerSignupDto.user.email"
            />
            <button
              type="button"
              class="
                col-span-2
                ml-4
                inline-block
                px-4
                bg-gray-200
                text-gray-700
                font-medium
                text-xs
                leading-tight
                rounded
                shadow-md
                hover:bg-gray-300 hover:shadow-lg
                focus:bg-gray-300
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-gray-400 active:shadow-lg
                transition
                duration-150
                ease-in-out
              "
              @click="onClickEmailCheckBtn"
            >
              확인
            </button>
          </div>
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="password"
              id="password"
              class="col-span-7 form-input block text-xs"
              placeholder="********"
              v-model="reqCustomerSignupDto.user.password"
            />
          </div>
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="password"
              id="passwordCheck"
              class="col-span-7 form-input block text-xs"
              placeholder="********"
              v-model="passwordCheck"
            />
          </div>
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="text"
              id="username"
              class="col-span-7 form-input block text-xs"
              placeholder="johncoopermaster"
              v-model="reqCustomerSignupDto.user.username"
            />
          </div>
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="text"
              id="nickname"
              class="col-span-7 form-input block text-xs"
              placeholder="John Cooper"
              v-model="reqCustomerSignupDto.customer.nickname"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button
        type="button"
        class="
          inline-block
          px-4
          py-2
          bg-yellow-500
          text-white
          font-medium
          text-xs
          leading-tight
          rounded
          shadow-md
          hover:bg-yellow-600 hover:shadow-lg
          focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-yellow-700 active:shadow-lg
          transition
          duration-150
          ease-in-out
        "
        @click="onClickCustomerSignupBtn"
      >
        가입하기
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  components: {},
  data() {
    return {
      reqCustomerSignupDto: {
        user: {
          email: "b14map@gmail.com",
          password: "b14map",
          username: "b14map",
        },
        role: {
          position: "customer",
        },
        customer: {
          nickname: "b14map",
        },
      },
      passwordCheck: "b14map",
      emailPossible: false,
    };
  },
  methods: {
    async onClickEmailCheckBtn() {
      console.log(`[CustomerSignupForm.vue] onClickEmailCheckBtn()`);
      const email = this.reqCustomerSignupDto.user.email;
      const result = await this.userStore.checkEmailExists({ email });
      if (!result) {
        this.emailPossible = true;
        alert("사용할 수 있는 이메일입니다.");
      } else {
        alert("사용할 수 없는 이메일입니다.");
      }
    },
    async onClickCustomerSignupBtn() {
      console.log(`[CustomerSignupForm.vue] onClickCustomerSignupBtn()`);
      if (!this.emailPossible) {
        alert("이메일 확인이 완료되지 않았습니다.");
        return;
      }
      const result = await this.userStore.signup(this.reqCustomerSignupDto);
      if (result) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
</style>