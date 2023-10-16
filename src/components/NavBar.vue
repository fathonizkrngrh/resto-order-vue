<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/"><strong>Resto</strong>Order</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Foods</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              <span class="d-flex align-items-center">
                Cart
                <b-icon-cart class=""></b-icon-cart>
                <p class="badge badge-success ml-1">
                  {{ cartValue || 0 }}
                </p>

              </span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link " to="/order">
              <span class="d-flex align-items-center">
                  My Order
                <b-icon-bag class=""></b-icon-bag>
                <p class="badge badge-success ml-1">
                  {{ orderValue || 0 }}
                </p>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      cartValue: "",
      orderValue: ""
    };
  },
  props: ["updateCart"],
  mounted() {
    
    const useragent = localStorage.getItem('useragent');
    axios
      .post(`${process.env.BE_URL}api/cart/list`, {useragent})
      .then((response) => {
        this.cartValue = response.data.data.length;
      })
      .catch((error) => {
        this.errored = true;
        console.log(error.message);
      });
    axios
      .post(`${process.env.BE_URL}api/order/list`, {useragent})
      .then((response) => {
        this.orderValue = response.data.data.length;
      })
      .catch((error) => {
        this.errored = true;
        console.log(error.message);
      });
  },
};
</script>

<style></style>
