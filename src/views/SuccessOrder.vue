<template>
  <div class="success-order">
    <NavBar />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
          <img src="../assets/images/success.png" width="300" />
          <h2><strong>Success send your order</strong></h2>
          <p>Go to cashier and pay</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "SuccessOrder",
  components: {
    NavBar,
  },
};
</script>

<style></style>
