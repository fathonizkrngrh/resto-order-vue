<template>
  <div>
    <div v-if="product.isReady === true" class="card shadow border-0 card-product">
      <img
        :src= "getImageUrl(product.imageId[0].imageUrl)"
        class="rounded-circle img-fulid mx-2 mt-4 d-md-none"
        alt=""
        height="120px"
        width="auto"
      />
      <img
        :src= "getImageUrl(product.imageId[0].imageUrl)"
        class="rounded-circle img-fulid mx-4 my-4 d-none d-md-block"
        alt=""
        height="200px"
        width="auto"
      />
      <div class="card-body d-flex flex-column align-items-center">
        <h6 class="card-title fw-bold lh-sm text-center text-md text-lg-md">{{ product.name }}</h6>
        <p class="card-text my-3">Rp. {{ formatRupiah(product.price) }}</p>
        <router-link
          :to="'/food/' + product._id"
          class="btn btn-sm btn-checkout px-3"
          >Order Now</router-link
        >
      </div>
    </div>
    <div v-if="product.isReady === false" class="card shadow border-0 card-product">
      <div class="bg-image">
        <img
        :src= "getImageUrl(product.imageId[0].imageUrl)"
        class="rounded-circle img-fulid mx-2 mt-4"
        alt=""
        height="120px"
        width="auto"
        />
        <div
          class="card-disable position-absolute align-items-center top-50 start-50 translate-middle w-100 h-100"
          style="background-color: rgba(0, 0, 0, 0.6)"
        >
          <p class="text-white text-center ">Out of Stock</p>
        </div>
      </div>
      <div class="card-body d-flex flex-column align-items-center">
        <p class="card-title lh-sm text-center">{{ product.name }}</p>
        <p class="card-text">Rp. {{ product.price }}</p>
        <router-link
          :to="'/food/' + product._id"
          class="btn btn-sm btn-checkout"
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
    formatRupiah(uang) {
      let reverse = uang.toString().split('').reverse().join(''); // Ubah angka menjadi string, balik urutannya
      let ribuan = reverse.match(/\d{1,3}/g); // Pisahkan menjadi grup-grup tiga angka
    
      let formatted = ribuan.join('.').split('').reverse().join(''); // Gabungkan dengan titik dan balik urutan lagi
      return formatted;
    },
  },
  
};
</script>

<style></style>
