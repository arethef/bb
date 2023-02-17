import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/b',
      name: 'Brand',
      redirect: '/b/tickets',
      component: () => import('../views/brand/BrandView.vue'),
      children: [
        {
          path: 'tickets',
          name: 'BrandTickets',
          component: () => import('../views/brand/tickets/BrandTicketsView.vue')
        },
        {
          path: 'tickets/:ticketId',
          name: 'BrandTicketDetail',
          component: () => import('../views/brand/tickets/BrandTicketDetailView.vue')
        },
        {
          path: 'products',
          name: 'BrandProducts',
          component: () => import('../views/brand/products/BrandProductsView.vue')
        },
        {
          path: 'markets',
          name: 'BrandMarkets',
          component: () => import('../views/brand/markets/BrandMarketsView.vue')
        },
        {
          path: 'profile',
          name: 'BrandProfile',
          component: () => import('../views/brand/profile/BrandProfileView.vue'),
        }
      ]
    },
    {
      path: '/c',
      name: 'Customer',
      component: () => import('../views/customer/CustomerView.vue'),
      children: [
        {
          path: 'markets',
          name: 'CustomerMarkets',
          component: () => import('../views/customer/markets/CustomerMarketsView.vue'),
        },
        {
          path: 'brands',
          name: 'CustomerBrand',
          component: () => import('../views/customer/brands/CustomerBrandsView.vue'),
        },
        {
          path: 'tickets',
          name: 'CustomerTickets',
          component: () => import('../views/customer/tickets/CustomerTicketsView.vue'),
        },
        {
          path: 'profile',
          name: 'CustomerProfile',
          component: () => import('../views/customer/profile/CustomerProfileView.vue'),
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
