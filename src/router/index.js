import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorite from "@/views/Favorite";
import Auth from "@/views/Auth";
import StorePage from "@/views/StorePage";

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/favorite',
    component: Favorite
  },
  {
    path: "/auth",
    component: Auth
  },
  {
    path: '/store-page',
    component: StorePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
