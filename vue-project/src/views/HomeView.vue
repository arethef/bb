<template>
  <div>
    <main>
      <p>[HomeView.vue]</p>
      <div class="grid gap-4 grid-flow-col">
        <div>
          <RouterLink to="/login">Login</RouterLink>
        </div>
        <div>
          <RouterLink to="/signup">Signup</RouterLink>
        </div>
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