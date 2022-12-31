import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main.css";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const options = {
  confirmButtonColor: "#541690",
  cancelButtonColor: "#FF4949",
};

Vue.use(VueSweetalert2, options);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
