<template>
  <div class="food-menu">
    <NavBar />
    <div class="container">
      <div class="row mt-4">
        <h2>Food<strong> Menu</strong></h2>
      </div>
      <div class="row mt-4">
        <div class="col-md-10">
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
        <div class="col-md-2">
          <div class="dropdown-center">
            <button
              class="btn btn-checkout dropdown-toggle w-100"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </button>
            <ul class="dropdown-menu">
              <li v-for="category in categories" :key="category._id">
                <a class="dropdown-item" :href="'#' + category._id">{{
                  category.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div v-for="category in categories" :key="category._id">
          <div class="row py-3" v-if="category.productId.length > 0">
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
              class="col-6 col-md-3 mt-2 mt-md-4 px-1"
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
      .get(`${process.env.BE_URL}api/category`)
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
