<template>
  <div class="card-product">
    <div v-if="product.isReady === true" class="card shadow card-product">
      <img
        :src="'assets/images/' + product.gambar"
        class="card-img-top img-fulid"
        alt=""
        height="150px"
        width="auto"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.nama }}</h5>
        <p class="card-text">Rp. {{ product.harga }}</p>
        <router-link :to="'/food/' + product.id" class="btn btn-sm btn-checkout"
          ><b-icon-cart></b-icon-cart> Cart</router-link
        >
      </div>
    </div>
    <div
      v-if="product.isReady === false"
      class="card shadow card-product bg-dark"
    >
      <img
        :src="'assets/images/' + product.gambar"
        class="card-img-top img-fulid"
        alt=""
        height="150px"
        width="auto"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.nama }}</h5>
        <p class="card-text">Rp. {{ product.harga }}</p>
        <router-link
          :to="'/food/' + product.id"
          class="btn btn-sm btn-checkout"
          aria-disabled="true"
          disabled
          ><b-icon-cart></b-icon-cart> Cart</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style></style>
