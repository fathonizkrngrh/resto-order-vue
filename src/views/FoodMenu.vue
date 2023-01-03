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
            id="search"
          />
          <span class="input-group-text" id="search-food"
            ><b-icon-search></b-icon-search
          ></span>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-md-4">
          <div class="card" style="width: 18rem">
            <div class="card-header">Category</div>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="category in categories"
                :key="category._id"
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  :href="'#' + category._id"
                  >{{ category.name }}</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-8">
          <div v-for="category in categories" :key="category._id" class="row">
            <div class="row">
              <div class="col-2 col-md-4">
                <hr />
              </div>
              <div class="col-8 col-md-4" :id="category._id">
                <h2 class="text-center">
                  <strong>{{ category.name }}</strong>
                </h2>
              </div>
              <div class="col-2 col-md-4">
                <hr />
              </div>
            </div>

            <div class="row mb-4 px-2 px-md-0">
              <div
                class="col-6 col-md-4 mt-2 mt-md-4 px-1 px-md-2"
                v-for="product in category.productId"
                :key="product._id"
              >
                <CardProduct :product="product" />
              </div>
            </div>
            <div v-if="categories.length === 0" class="row mb-4">
              <div class="alert alert-danger text-center" role="alert">
                Product Not Found. Please search another product
              </div>
            </div>
          </div>
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
      categories: [],
      search: "",
    };
  },
  methods: {
    setCategories(data) {
      this.categories = data;
    },
    searchProducts() {
      axios
        .get("http://localhost:3000/products?q=" + this.search)
        .then((response) => {
          this.setCategories(response.data.data);
        })
        .catch((error) => {
          this.errored = true;
          console.log(error.message);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/category")
      .then((response) => {
        this.setCategories(response.data.data);
        console.log("berhasil :", this.categories);
      })
      .catch((error) => {
        this.errored = true;
        console.log(error.message);
      });
  },
};
</script>

<style></style>
