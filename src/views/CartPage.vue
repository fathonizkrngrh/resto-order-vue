<template>
  <div class="cart">
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
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <h2>My <strong>Cart</strong></h2>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12 col-md-8 table-responsive">
          <table class="table align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Product Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Total Price</th>
                <th scope="col">Notes</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(productCart, index) in productCarts"
                :key="productCart.id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ productCart.productId.nama }}</td>
                <td>{{ productCart.qty }}</td>
                <td class="text-end">Rp. {{ productCart.productId.harga }}</td>
                <td class="text-end">
                  <strong>Rp. {{ productCart.productId.harga }}</strong>
                </td>
                <td>
                  {{ productCart.notes }}
                </td>
                <td>
                  <b-icon-trash></b-icon-trash>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-0 col-md-4 fixed">
          <div class="card">
            <div class="card-body">
              <p class="text-right"><strong>Preview Order</strong></p>
              <div class="row">
                <div class="col-7">
                  <p>Subtotal {{ productCarts.length }} products</p>
                </div>
                <div class="col-5">
                  <p class="text-end"><strong>Rp. 50.000</strong></p>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <p>Tax (10%)</p>
                </div>
                <div class="col-5">
                  <p class="text-end"><strong>Rp. 5.000</strong></p>
                </div>
              </div>

              <hr />
              <div class="row">
                <div class="col-5">
                  <p>Price Total</p>
                </div>
                <div class="col-7">
                  <h4 class="text-end">
                    <strong>Rp. {{ totalPrice }}</strong>
                  </h4>
                </div>
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
import axios from "axios";

export default {
  name: "CartPage",
  components: {
    NavBar,
  },
  data() {
    return {
      productCarts: {},
    };
  },
  methods: {
    setProductCart(data) {
      this.productCarts = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/carts")
      .then((response) => {
        this.setProductCart(response.data);
        console.log(this.productCarts);
      })
      .catch((error) => console.log(error.message));
  },
  computed(){
    totalPrice() {
        return this.productCarts.reduce(function(items, data) {
            return items + (data.productId.harga * data.qty);
        }, 0)
    }
  }
};
</script>

<style></style>
