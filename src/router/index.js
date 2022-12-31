import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import FoodMenu from "../views/FoodMenu.vue";
import FoodDetail from "../views/FoodDetail.vue";
import CartPage from "../views/CartPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/foods",
    name: "Food Menu",
    component: FoodMenu,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/food/:id",
    name: "Food Detail",
    component: FoodDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
