<template>
  <div>
    <p>[BrandView.vue]</p>
    <header>
      <div class="flex justify-center m-4">
        <p>{{ this.brandStore.brandProfile.businessName }}</p>
      </div>
      <nav
        class="
          navbar navbar-expand-lg
          shadow-md
          py-2
          bg-white
          relative
          flex
          items-center
          w-full
          justify-between
        "
      >
        <div class="md:container md:mx-auto">
          <div class="">
            <ul class="navbar-nav mr-auto lg:flex lg:flex-row ml-4">
              <li class="nav-item">
                <RouterLink
                  to="/b/tickets"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-bb-txt
                    hover:text-bb-a
                    focus:text-bb-a
                    transition
                    duration-150
                    ease-in-out
                  "
                  >주문내역
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  to="/b/products"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-bb-txt
                    hover:text-bb-a
                    focus:text-bb-a
                    transition
                    duration-150
                    ease-in-out
                  "
                  >판매상품
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  to="/b/markets"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-bb-txt
                    hover:text-bb-a
                    focus:text-bb-a
                    transition
                    duration-150
                    ease-in-out
                  "
                  >마켓
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink
                  to="/b/profile"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-bb-txt
                    hover:text-bb-a
                    focus:text-bb-a
                    transition
                    duration-150
                    ease-in-out
                  "
                  >브랜드정보
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>
import { useBrandStore } from "../../stores/brand";
export default {
  setup() {
    const brandStore = useBrandStore();
    return { brandStore };
  },
  data() {
    return {};
  },
  created() {
    this.brandStore.getBrand();
  },
};
</script>

<style>
</style>