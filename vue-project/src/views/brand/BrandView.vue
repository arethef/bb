<template>
  <div>
    <p>[BrandView.vue]</p>
    <header>header</header>
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
};
</script>

<style>
</style>