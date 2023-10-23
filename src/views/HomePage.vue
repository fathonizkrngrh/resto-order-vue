<template>
  <div class="home ">
    <NavBar />
    <div class="container">
      <HerroBanner />

      <!-- Desktop -->
      <div class="row mt-5">
        <div class="col-2 col-md-4">
          <hr />
        </div>
        <div class="col-8 col-md-4">
          <h2 class="text-center"><strong>Popular</strong> Foods</h2>
        </div>
        <div class="col-2 col-md-4">
          <hr />
        </div>
        <!-- <div class="col">
            <router-link to="/foods" class="btn btn-md btn-checkout float-end">
              <b-icon-eye></b-icon-eye> See All Menu</router-link
            >
          </div> -->
      </div>

      <div class="row mb-4 mt-3 px-2 px-md-0">
        <div
          class="col-6 col-md-3 mt-2 mt-md-4 px-1 px-md-2"
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
      this.products = data.product;

      const userId = localStorage.getItem('userId');
      if (data.userId && !userId) {
        localStorage.setItem('userId', data.userId);
      }
    },
  },
  mounted() {
    axios
      .get(`${process.env.BE_URL}api/popular-product`)
      .then((response) => {
        this.setProducts(response.data.data);
      })
      .catch((error) => {
        this.errored = true;
        console.log(error.message);
      });
  },
};
</script>

<style></style>
