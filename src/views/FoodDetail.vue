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
          <div class="row">
            <img
              :src= "getImageUrl(images[0].imageUrl)"
              class="img-fulid shadow w-100"
              alt=""
              id="main-image"
              ref="mainImage"
            />
          </div>
          <!-- <div v-if="images.length > 1" class="row mt-4">
            <div v-for="image in images" :key="image.id" class="col-4">
              <img
                :src="process.env.BE_URL + image.imageUrl"
                class="img-fulid shadow w-100"
                alt=""
                @click="changeImage"
                id="image-tab"
              />
            </div>
          </div> -->
        </div>
        <div class="col-md-6 ml-2">
          <h2 class="mt-3">
            <strong>
              {{ product.name }}
            </strong>
          </h2>
          <h4 class="mt-3">
            Harga : <strong>Rp. {{ product.price }}</strong>
          </h4>
          <form action="" class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="qty" class="form-label">Quantity</label>
              <input
                type="number"
                id="qty"
                class="form-control"
                v-model="orders.qty"
              />
            </div>
            <div class="form-group">
              <label for="notes" class="form-label">Notes</label>
              <textarea
                id="notes"
                class="form-control"
                placeholder="Add your notes, ex: Extra spicy, Without rice"
                v-model="orders.notes"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-checkout" @click="order">
              Add to Cart
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
      product: {},
      images: {},
      orders: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    setImage(data) {
      this.images = data;
    },
    changeImage(event) {
      this.$refs.mainImage.src = event.target.src;
    },
    order() {
      this.orders.productId = this.product;
      if (!this.orders.qty) {
        this.$toast.warning("Please insert your quantity", {
          position: "top-right",
          timeout: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          rtl: false,
        });
      } else {
        axios
          .post(
            `${process.env.BE_URL}api/cart/` + this.$route.params.id,
            this.orders
          )
          .then(() => {
            this.$toast.success("Success add to cart", {
              position: "top-right",
              timeout: 3000,
              closeOnClick: true,
              pauseOnHover: true,
              showCloseButtonOnHover: true,
              hideProgressBar: true,
              closeButton: "button",
              rtl: false,
            });
            this.$router.push({ path: "/cart" });
          })
          .catch((err) => console.log(err));
      }
    },
    getImageUrl(imagePath) {
      return process.env.BE_URL + imagePath;
    },
  },
  mounted() {
    axios
      .get(`${process.env.BE_URL}api/product/` + this.$route.params.id)
      .then((response) => {
        this.setProduct(response.data.data);
        this.setImage(response.data.data.imageId);
        console.log("images:", this.images);
      })
      .catch((error) => console.log(error.message));
  },
};
</script>

<style></style>
