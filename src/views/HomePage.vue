<template>
  <div class="home">
    <NavBar />
    <div class="container">
      <HerroBanner />

      <!-- Desktop -->
      <div class="d-none d-md-block">
        <div class="row mt-5">
          <div class="col">
            <h2><strong>Best</strong> Foods</h2>
          </div>
          <div class="col">
            <router-link to="/foods" class="btn btn-md btn-checkout float-end">
              <b-icon-eye></b-icon-eye> See All Menu</router-link
            >
          </div>
        </div>
      </div>
      <!-- Mobile -->
      <div class="d-sm-block d-md-none">
        <div class="row mt-4 mx-2">
          <div class="col-md-6">
            <h2><strong>Best</strong> Foods</h2>
          </div>

          <div class="col-md-6">
            <router-link to="/foods" class="btn btn-md btn-checkout">
              <b-icon-eye></b-icon-eye> See All Menu</router-link
            >
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div
          class="col-xs-6 col-md-3 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import HerroBanner from "../components/HerroBanner.vue";
import CardProduct from "../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    NavBar,
    HerroBanner,
    CardProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/?isPopular=true")
      .then((response) => {
        this.setProducts(response.data);
        // console.log("berhasil :", this.products);
      })
      .catch((error) => {
        this.errored = true;
        console.log(error.message);
      });
  },
};
</script>

<style></style>
