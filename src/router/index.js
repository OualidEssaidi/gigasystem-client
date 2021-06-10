import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Client from "../views/Client.vue";
import Produit from "../views/Produit.vue";
import Document from "../views/Document.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/client",
    name: "ClientManager",
    component: Client,
  },
  {
    path: "/produit",
    name: "Produit",
    component: Produit,
  },
  {
    path: "/document",
    name: "Document",
    component: Document,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
