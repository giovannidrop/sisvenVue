import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import CategoryComponent from '../components/Category/CategoryComponent.vue';
import ProductComponent from '../components/Product/ProductComponent.vue';
import PayModeComponent from '../components/PayMode/PayModeComponent.vue';
import CustomerComponent from '../components/Customer/CustomerComponent.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
path: '/categories',
name: 'Categories',
component: CategoryComponent
  },
  {
path: '/products',
name: 'Products',
component: ProductComponent
  },
  {
path: '/paymodes',
name: 'Paymodes',
component: PayModeComponent
  },
  {
path: '/customers',
name: 'Customers',
component: CustomerComponent
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
