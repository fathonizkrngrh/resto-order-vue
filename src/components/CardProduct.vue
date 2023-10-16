<template>
  <div>
    <div v-if="product.isReady === true" class="card shadow border-0 card-product">
      <img
        :src= "getImageUrl(product.imageId[0].imageUrl)"
        class="card-img-top img-fulid"
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
    <div v-if="product.isReady === false" class="card shadow border-0 card-product">
      <div class="bg-image">
        <img
          :src="getImageUrl(product.imageId[0].imageUrl)"
          class="card-img-top img-fulid"
          alt=""
          height="150px"
          width="auto"
        />
        <div
          class="card-disable position-absolute align-items-center top-50 start-50 translate-middle w-100 h-100"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <p class="text-white text-center ">Out of Stock</p>
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
  methods: {
    getImageUrl(imagePath) {
      return process.env.BE_URL + imagePath;
    },
  },
};
</script>

<style></style>
