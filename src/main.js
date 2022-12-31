import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import Toast from "vue-toastification";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const swalOptions = {
  confirmButtonColor: "#541690",
  cancelButtonColor: "#FF4949",
};

const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
};

Vue.use(VueSweetalert2, swalOptions);
Vue.use(Toast, toastOptions);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
