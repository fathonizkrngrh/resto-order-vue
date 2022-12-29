<template>
  <div class="home">
    <NavBar />
    <div class="container">
      <HerroBanner />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import HerroBanner from "../components/HerroBanner.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
    HerroBanner,
  },
};
</script>

<style></style>
