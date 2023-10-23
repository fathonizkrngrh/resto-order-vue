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

        <div class="col-12">
          <h3 v-if="productCarts.length === 0" class="text-center my-5">
            Card is empty. Choose your
            <router-link to="/foods">foods</router-link> and checkout.
          </h3>
        </div>
        <div class="col-12 col-md-8 p-4 border rounded" >
          <table class="table table-responsive pt-4"  v-if="productCarts.length > 0">
            <tbody>
              <tr
                v-for="(productCart) in productCarts"
                :key="productCart._id"
              >
                <td>
                  <div class="d-flex mb-2">
                    <div class="flex-shrink-0">
                      <img :src="getImageUrl(productCart.productId.imageId[0].imageUrl)" alt="" width="50" class="img-fluid">
                    </div>
                    <div class="flex-lg-grow-1 ms-3">
                      <h6 class="medium mb-0"><a :href="'/food/'+ productCart.productId._id" class="text-reset">{{ productCart.productId.name }}</a></h6>
                      <span class="small">  {{ productCart.notes }}</span>
                    </div>
                  </div>
                </td>
                <td>{{ productCart.qty }}</td>
                <td class="text-end">Rp. {{ productCart.subtotalRupiah }}</td>
              </tr>
            </tbody>
            
          </table>
        </div>
        <div class="col-0 col-md-4 fixed" v-if="productCarts.length > 0">
          <div class="card">
            <div class="card-body">
              <p class="text-right"><strong>Preview Order</strong></p>
              <table  class="table table-borderless">
                <tbody>
                  <tr>
                    <td colspan="1">Total Items</td>
                    <td class="text-end" colspan="2">{{ productCarts.length }}</td>
                  </tr>
                  <tr>
                    <td colspan="1">Subtotal</td>
                    <td class="text-end" colspan="2">Rp. {{ totalBeforeTax }}</td>
                  </tr>
                  <tr>
                    <td colspan="1">Tax (10%)</td>
                    <td class="text-end" colspan="2">Rp. {{ tax(totalBeforeTax) }}</td>
                  </tr>
                  <tr class="fw-bold">
                    <td colspan="2">TOTAL</td>
                    <td class="text-end">Rp. {{ tax(totalBeforeTax) + totalBeforeTax }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="row mt-3">
                <form @submit="order">
                  <div class="mb-3">
                    <label for="username" class="form-label"
                      >Orderer Name</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Enter your name"
                      v-model="cartOrdered.username"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="tablenumber" class="form-label"
                      >Table Number</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="tableNumber"
                      placeholder="Enter your table number"
                      v-model="cartOrdered.tableNumber"
                      required
                    />
                  </div>

                  <button type="submit" class="btn btn-checkout">
                    Order Now
                  </button>
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
import {formatRupiah} from "../helper/formatter"

export default {
  name: "CartPage",
  components: {
    NavBar,
  },
  data() {
    return {
      productCarts: {},
      message: {},
      cartOrdered: {},
    };
  },
  methods: {
    setProductCart(data) {
      const formattedData = data.map(item => {
        const subtotalRupiah = formatRupiah(item.subtotal)
        const priceRupiah = formatRupiah(item.productId.price)
        return {
          ...item,
          subtotalRupiah, priceRupiah
        }
      })
      this.productCarts = formattedData;
    },
    deleteProductInCart(id) {
      
      const userId = localStorage.getItem('userId');
      axios.delete(`${process.env.BE_URL}api/cart/` + id).then(() => {
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
        axios.post(`${process.env.BE_URL}api/cart/list`, {userId} )
          .then((response) => {
            this.setProductCart(response.data.data);
            console.log(response.data.data)
          })
          .catch((error) => {
            this.message = error.message;
            console.log(error.message);
          });
          
        window.location.reload()

      }).catch((error) => {
            this.message = error.message;
            console.log(error.message);
      });
    },
    getImageUrl(imagePath) {
      return process.env.BE_URL + imagePath;
    },
    tax(subtotalPrice) {
      return (subtotalPrice * 0.1);
    },
    order(event) {
      event.preventDefault();
      this.cartOrdered.userId = localStorage.getItem('userId');
      axios
        .post(`${process.env.BE_URL}api/order`, this.cartOrdered)
        .then(() => {
          this.$toast.success("Success order product", {
            position: "top-right",
            timeout: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            rtl: false,
          });
          // lempar ke success page

          this.$router.push({ path: "/success-order" });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.message, {
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
  },
  mounted() {
    const userId = localStorage.getItem('userId');
    axios
      .post(`${process.env.BE_URL}api/cart/list`, {userId})
      .then((response) => {
        this.setProductCart(response.data.data);
        console.log(response.data.data)
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
  computed: {
    totalBeforeTax() {
      return this.productCarts.reduce(function (item, data) {
        return item + data.productId.price * data.qty;
      }, 0);
    },
    formatRupiah(uang) {
      let reverse = uang.toString().split('').reverse().join(''); // Ubah angka menjadi string, balik urutannya
      let ribuan = reverse.match(/\d{1,3}/g); // Pisahkan menjadi grup-grup tiga angka
    
      let formatted = ribuan.join('.').split('').reverse().join(''); // Gabungkan dengan titik dan balik urutan lagi
      return formatted;
    },
  },
};
</script>

<style></style>
