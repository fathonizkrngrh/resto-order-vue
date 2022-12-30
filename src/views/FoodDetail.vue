<template>
  <div class="food-detail">
    <NavBar />

    <div class="container">
      <!-- breadcrumb -->
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mt-3">
              <li class="breadcrumb-item text">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item text">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- product detail -->
      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="'../assets/images/' + product.gambar"
            class="card-img-top img-fulid shadow"
            alt=""
            height="auto"
            width="auto"
          />
        </div>
        <div class="col-md-6 ml-2">
          <h2 class="mt-3">
            <strong>
              {{ product.nama }}
            </strong>
          </h2>
          <h4 class="mt-3">
            Harga : <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form action="" class="mt-4">
            <div class="form-group">
              <label for="qty" class="form-label">Quantity</label>
              <input type="number" id="qty" class="form-control" />
            </div>
            <div class="form-group">
              <label for="notes" class="form-label">Notes</label>
              <textarea
                id="notes"
                class="form-control"
                placeholder="Add your notes, ex: Extra spicy, Without rice"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-checkout float-end">
              Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "FoodDetail",
  components: {
    NavBar,
  },
  data() {
    return {
      product: [],
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products/" + this.$route.params.id)
      .then((response) => this.setProduct(response.data))
      .catch((error) => console.log(error.message));
  },
};
</script>

<style></style>
