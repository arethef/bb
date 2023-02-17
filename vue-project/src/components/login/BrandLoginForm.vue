<template>
  <div>
    <div class="border p-4">
      <p>[BrandLoginForm.vue]</p>
      <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
        <div class="col-span-1 grid gap-1 m-1">
          <div class="p-1">
            <label for="username" class="block">사용자이름</label>
          </div>
          <div class="p-1">
            <label for="password" class="block">비밀번호</label>
          </div>
        </div>
        <div class="col-span-3 grid gap-1 m-1">
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="text"
              id="username"
              class="col-span-9 form-input block text-xs"
              placeholder="bbang@example.com"
              v-model="reqBrandLoginDto.username"
            />
            <!-- v-model="reqBrandLoginDto.user.username" -->
          </div>
          <div class="grid grid-flow-col-dense grid-cols-9 p-1">
            <input
              type="password"
              id="password"
              class="col-span-9 form-input block text-xs"
              placeholder="********"
              v-model="reqBrandLoginDto.password"
            />
            <!-- v-model="reqBrandLoginDto.user.password" -->
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
        @click="onClickBrandLoginBtn"
      >
        로그인하기
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
      reqBrandLoginDto: {
        username: "goldflowed",
        password: "goldflowed",
        // user: {
        //   username: "goldflowed",
        //   password: "goldflowed",
        // },
        // role: {
        //   position: "brand",
        // },
      },
    };
  },
  methods: {
    async onClickBrandLoginBtn() {
      console.log(`++++++ [BrandLoginForm.vue] onClickBrandLoginBtn() ++++++`);
      const result = await this.userStore.login(this.reqBrandLoginDto);
      console.log(`❯❯❯❯❯❯ result:`, result);
    },
  },
};
</script>

<style>
</style>