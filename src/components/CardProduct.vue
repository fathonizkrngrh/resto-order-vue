<template>
  <div>
    <div v-if="product.isReady === true" class="card shadow card-product">
      <img
        :src="'http://localhost:8080/' + product.imageId[0].imageUrl"
        class="card-img-top img-fulid p-1"
        alt=""
        height="150px"
        width="auto"
      />
      <div class="card-body">
        <h5 class="card-title lh-sm">{{ product.name }}</h5>
        <p class="card-text">Rp. {{ product.price }}</p>
        <router-link
          :to="'/food/' + product._id"
          class="btn btn-sm btn-checkout"
          ><b-icon-cart></b-icon-cart> Cart</router-link
        >
      </div>
    </div>
    <div v-if="product.isReady === false" class="card shadow card-product">
      <div class="bg-image">
        <img
          :src="'http://localhost:8080/' + product.imageId[0].imageUrl"
          class="card-img-top img-fulid p-1"
          alt=""
          height="150px"
          width="auto"
        />
        <div
          class="card-disable position-absolute top-50 start-50 translate-middle w-100 h-100"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <p class="text-white text-center py-2">Out of Stock</p>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Rp. {{ product.price }}</p>
        <router-link
          :to="'/food/' + product._id"
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
