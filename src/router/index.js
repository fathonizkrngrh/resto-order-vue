import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import FoodMenu from "../views/FoodMenu.vue";
import FoodDetail from "../views/FoodDetail.vue";
import CartPage from "../views/CartPage.vue";
import OrderPage from "../views/OrderPage.vue";
import SuccessOrder from "../views/SuccessOrder.vue";

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
  {
    path: "/order",
    name: "Ordered Products",
    component: OrderPage,
  },
  {
    path: "/success-order",
    name: "Success",
    component: SuccessOrder,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
