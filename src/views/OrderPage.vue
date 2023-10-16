<template>
  <div class="cart">
    <NavBar :updateCart="orderedProduct" />
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
              <li class="breadcrumb-item active" aria-current="page">Ordered Product</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <h2>My <strong>Ordered</strong> Product</h2>
        </div>
      </div>

      <div class="row mt-4">
        <div class="table-responsive">
          <h3 v-if="orderedProduct.length === 0" class="text-center my-5">
            Order is empty. Choose your
            <router-link to="/foods">foods</router-link> and order.
          </h3>
          <table class="table align-middle" v-if="orderedProduct.length > 0">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Invoice</th>
                <th scope="col">Table Number</th>
                <th scope="col">Name</th>
                <th scope="col">Tax</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(orderedProduct, index) in orderedProduct"
                :key="orderedProduct._id"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ orderedProduct.invoice }}</td>
                <td>{{ orderedProduct.tableNumber }}</td>
                <td>{{ orderedProduct.username }}</td>
                <td class="text-end">Rp. {{ orderedProduct.tax }}</td>
                <td class="text-end">
                  <strong>Rp. {{ orderedProduct.total }}</strong>
                </td>

                <td v-if="orderedProduct.isPaid === true" class="text-success">Paid</td>
                <td v-if="orderedProduct.isPaid === false" class="text-danger">Unpaid</td>
              </tr>
            </tbody>
          </table>
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
      orderedProduct: [],
      message: {},
    };
  },
  methods: {
    setOrderedProduct(data) {
      this.orderedProduct = data;
    },
  },
  mounted() {
    const useragent = localStorage.getItem('useragent');
    axios
      .post(`${process.env.BE_URL}api/order/list`, {useragent})
      .then((response) => {
        this.setOrderedProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
        this.$toast.error(error.message, {
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          rtl: false,
        });
      });
  },
};
</script>

<style></style>
