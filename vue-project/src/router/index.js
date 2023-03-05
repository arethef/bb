import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/b",
      name: "Brand",
      redirect: "/b/tickets",
      component: () => import("../views/brand/BrandView.vue"),
      children: [
        {
          path: "tickets",
          name: "BrandTickets",
          component: () =>
            import("../views/brand/tickets/BrandTicketsView.vue"),
        },
        {
          path: "tickets/:ticketId",
          name: "BrandTicketDetail",
          component: () =>
            import("../views/brand/tickets/BrandTicketDetailView.vue"),
          props: true,
        },
        {
          path: "products",
          name: "BrandProducts",
          component: () =>
            import("../views/brand/products/BrandProductsView.vue"),
          // beforeEnter: async (to, from, next) => {
          //   await this.productStore.loadProducts();
          //   next();
          // }
        },
        {
          path: "products/:productId",
          name: "BrandProductDetail",
          component: () =>
            import("../views/brand/products/BrandProductDetailView.vue"),
          props: true,
        },
        {
          path: "markets",
          name: "BrandMarkets",
          component: () =>
            import("../views/brand/markets/BrandMarketsView.vue"),
        },
        {
          path: "markets/new",
          name: "BrandMarketNew",
          component: () =>
            import("../views/brand/markets/BrandMarketNewView.vue"),
        },
        {
          path: "markets/:marketId",
          name: "BrandMarketDetail",
          component: () =>
            import("../views/brand/markets/BrandMarketDetailView.vue"),
          props: true,
        },
        {
          path: "profile",
          name: "BrandProfile",
          component: () =>
            import("../views/brand/profile/BrandProfileView.vue"),
        },
      ],
    },
    {
      path: "/c",
      name: "Customer",
      redirect: "/c/markets",
      component: () => import("../views/customer/CustomerView.vue"),
      children: [
        {
          path: "markets",
          name: "CustomerMarkets",
          component: () =>
            import("../views/customer/markets/CustomerMarketsView.vue"),
        },
        {
          path: "markets/:marketId",
          name: "CustomerMarketDetail",
          component: () =>
            import("../views/customer/markets/CustomerMarketDetailView.vue"),
          props: true,
        },
        {
          path: "brands",
          name: "CustomerBrands",
          component: () =>
            import("../views/customer/brands/CustomerBrandsView.vue"),
        },
        {
          path: "brands/:brandId",
          name: "CustomerBrandDetail",
          component: () =>
            import("../views/customer/brands/CustomerBrandDetailView.vue"),
          props: true,
        },
        {
          path: "products",
          name: "CustomerProducts",
          component: () =>
            import("../views/customer/products/CustomerProductsView.vue"),
        },
        {
          path: "products/:productId",
          name: "CustomerProductDetail",
          component: () =>
            import("../views/customer/products/CustomerProductDetailView.vue"),
          props: true,
        },
        {
          path: "tickets",
          name: "CustomerTickets",
          component: () =>
            import("../views/customer/tickets/CustomerTicketsView.vue"),
        },
        {
          path: "tickets/:ticketId",
          name: "CustomerTicketDetail",
          component: () =>
            import("../views/customer/tickets/CustomerTicketDetailView.vue"),
          props: true,
        },
        {
          path: "bookmarks",
          name: "CustomerBookmarks",
          component: () =>
            import("../views/customer/bookmarks/CustomerBookmarksView.vue"),
        },
        {
          path: "profile",
          name: "CustomerProfile",
          component: () =>
            import("../views/customer/profile/CustomerProfileView.vue"),
        },
        {
          path: "search/:searchStr",
          name: "CustomerSearch",
          component: () =>
            import("../views/customer/search/CustomerSearchView.vue"),
          props: true,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
