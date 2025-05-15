import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Add other routes if needed
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
