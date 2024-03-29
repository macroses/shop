import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorite from "@/views/Favorite";
import Auth from "@/views/Auth";
import StorePage from "@/views/StorePage";
import VCategoryItem from "@/components/VCategoryItem";
import VGoodItem from "@/components/VGoodItem";

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
  },
  {
    path: '/category/:id',
    component: VCategoryItem
  },
  {
    path: '/goodItem/:id',
    component: VGoodItem
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
