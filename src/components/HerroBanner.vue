<template>
  <div class="hero">
    <!-- Desktop -->
    <div class="d-none d-md-block p-4">
      <div class="row mt-4">
        <div class="col-md-6 ">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h1 class="fs-1">
                <strong>Satisfy your cravings </strong><br />with a few clicks!
              </h1>
              <p>Order your favorite dishes from your table.</p>
              <router-link to="/foods" class="btn btn-md btn-checkout"
                ><b-icon-arrow-right></b-icon-arrow-right> Order</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <img
              class="mt-2 mx-auto d-block"
              src="../assets/images/herro.png"
              alt=""
              width="70%"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none p-4">
      <div class="row mt-4 mx-1">
        <div class="col-md-6 mb-3">
          <div class="d-flex h-100">
            <img
              class="mt-2 mx-auto d-block"
              src="../assets/images/herro.png"
              alt=""
              width="70%"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2 class="fs-1 hl-lg">
                <strong>Satisfy your cravings </strong><br />with a few clicks!
              </h2>
              <p>Order your favorite dishes from your table.</p>
              <button class="btn btn-md btn-checkout mx-auto">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HerroBanner",
};
</script>

<style></style>
