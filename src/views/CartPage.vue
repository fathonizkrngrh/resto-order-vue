<template>
  <div class="cart">
    <NavBar :updateCart="productCarts" />
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
          <h3 v-if="productCarts.length === 0" class="text-center my-5">
            Card is empty. Choose your
            <router-link to="/foods">foods</router-link> and checkout.
          </h3>
          <table class="table align-middle" v-if="productCarts.length > 0">
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
                :key="productCart._id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ productCart.productId.name }}</td>
                <td>{{ productCart.qty }}</td>
                <td class="text-end">Rp. {{ productCart.productId.price }}</td>
                <td class="text-end">
                  <strong>Rp. {{ productCart.subtotal }}</strong>
                </td>
                <td>
                  {{ productCart.notes }}
                </td>
                <td>
                  <b-icon-trash
                    @click="deleteProductInCart(productCart._id)"
                  ></b-icon-trash>
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
                  <p class="text-end">
                    <strong>Rp. {{ totalBeforeTax }}</strong>
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-7">
                  <p>Tax (10%)</p>
                </div>
                <div class="col-5">
                  <p class="text-end">
                    <strong>Rp. {{ tax(totalBeforeTax) }}</strong>
                  </p>
                </div>
              </div>

              <hr />
              <div class="row">
                <div class="col-5">
                  <p>Price Total</p>
                </div>
                <div class="col-7">
                  <h4 class="text-end">
                    <strong
                      >Rp. {{ tax(totalBeforeTax) + totalBeforeTax }}</strong
                    >
                  </h4>
                </div>
              </div>
              <div class="row mt-3">
                <form>
                  <div class="mb-3">
                    <label for="username" class="form-label"
                      >Orderer Name</label
                    >
                    <input
                      type="username"
                      class="form-control"
                      id="username"
                      placeholder="Please enter your name"
                      required
                    />
                  </div>
                  <select class="form-select" aria-label="Your table number">
                    <option selected>Please select your table number</option>
                    <option
                      v-for="option in options"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.value }}
                    </option>
                  </select>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
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
      message: {},
      options: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
      ],
      cartOrdered: {},
    };
  },
  methods: {
    setProductCart(data) {
      this.productCarts = data;
    },
    deleteProductInCart(id) {
      axios.delete("http://localhost:8080/api/cart/" + id).then(() => {
        this.$toast.success("Success delete product", {
          position: "top-right",
          timeout: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          rtl: false,
        });
        //update cart
        axios
          .get("http://localhost:8080/api/cart")
          .then((response) => {
            this.setProductCart(response.data.data);
          })
          .catch((error) => {
            this.message = error.message;
            console.log(error.message);
          });
      });
    },

    tax(subtotalPrice) {
      return subtotalPrice * 0.1;
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/api/cart")
      .then((response) => {
        this.setProductCart(response.data.data);
      })
      .catch((error) => console.log(error.message));
  },
  computed: {
    totalBeforeTax() {
      return this.productCarts.reduce(function (item, data) {
        return item + data.productId.price * data.qty;
      }, 0);
    },
  },
};
</script>

<style></style>
