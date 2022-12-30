<template>
  <div class="food-menu">
    <NavBar />
    <div class="container">
      <div class="row mt-4">
        <h2>Food<strong> Menu</strong></h2>
      </div>
      <div class="row mt-4">
        <div class="input-group mb-3">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search your favourite food"
            aria-label="Search your favourite food"
            aria-describedby="search-food"
            @keyup="searchProducts"
          />
          <span class="input-group-text" id="search-food"
            ><b-icon-search></b-icon-search
          ></span>
        </div>
      </div>
      <div class="row mb-4">
        <div
          class="col-md-3 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
      <div v-if="products.length === 0" class="row mb-4">
        <div class="alert alert-danger text-center" role="alert">
          Product Not Found. Please search another product
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import CardProduct from "../components/CardProduct.vue";
import axios from "axios";

export default {
  name: "FoodMenu",
  components: {
    NavBar,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchProducts() {
      axios
        .get("http://localhost:3000/products?q=" + this.search)
        .then((response) => {
          this.setProducts(response.data);
        })
        .catch((error) => {
          this.errored = true;
          console.log(error.message);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products?_sort=isReady&_order=desc")
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
