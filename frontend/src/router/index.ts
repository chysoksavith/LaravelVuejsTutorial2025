import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import { useAuthStore } from "@/store/auth";
import PostIndex from "@/views/posts/PostIndex.vue";
import PostCreate from "@/views/posts/PostCreate.vue";
import PostView from "@/views/posts/PostView.vue";
import PostEdit from "@/views/posts/PostEdit.vue";
import CategoryIndex from "@/views/category/CategoryIndex.vue";
import CategoryCreate from "@/views/category/CategoryCreate.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import CategoryEdit from "@/views/category/CategoryEdit.vue";
import ProductView from "@/product/ProductView.vue";
import ProductIndex from "@/product/ProductIndex.vue";
import ProductCreate from "@/product/ProductCreate.vue";
import ProductEdit from "@/product/ProductEdit.vue";
import BrandIndex from "@/views/brand/BrandIndex.vue";
import BrandCreate from "@/views/brand/BrandCreate.vue";
import BrandEdit from "@/views/brand/BrandEdit.vue";
import BrandView from "@/views/brand/BrandView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresGuest: true },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresGuest: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    // post
    {
      path: "/dashboard/posts",
      name: "PostIndex",
      component: PostIndex,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/posts/create",
      name: "PostCreate",
      component: PostCreate,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard/posts/:slug",
      name: "PostView",
      component: PostView,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/posts/:slug/edit",
      name: "PostEdit",
      component: PostEdit,
      meta: { requiresAuth: true },
      props: true,
    },
    // category
    {
      path: "/dashboard/categories",
      name: "CategoryIndex",
      component: CategoryIndex,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/categories/create",
      name: "CategoryCreate",
      component: CategoryCreate,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/categories/:id/edit",
      name: "CategoryEdit",
      component: CategoryEdit,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/categories/:id",
      name: "CategoryView",
      component: CategoryView,
      meta: { requiresAuth: true },
      props: true,
    },
    // product
    {
      path: "/dashboard/products",
      name: "ProductIndex",
      component: ProductIndex,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/products/create",
      name: "ProductCreate",
      component: ProductCreate,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/products/:id/edit",
      name: "ProductEdit",
      component: ProductEdit,
      meta: { requiresAuth: true },
      props: true,
    },
    {
      path: "/dashboard/products/:id",
      name: "ProductView",
      component: ProductView,
      meta: { requiresAuth: true },
      props: true,
    },

    // brand
    {
      path: "/dashboard/brands",
      name: "BrandIndex",
      component: BrandIndex,
    },
    {
      path: "/dashboard/brands/create",
      name: "BrandCreate",
      component: BrandCreate,
    },
    {
      path: "/dashboard/brands/:id",
      name: "BrandView",
      component: BrandView,
    },
    {
      path: "/dashboard/brands/:id/edit",
      name: "BrandEdit",
      component: BrandEdit,
    },
    // route error
    {
      path: "/404",
      name: "404",
      component: () => import("../views/error/404.vue"),
    },
    {
      path: "/500",
      name: "500",
      component: () => import("../views/error/500.vue"),
    },
    {
      path: "/about",
      name: "about",

      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/error/404.vue"),
    },
  ],
});
// route guard middleware
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth) && !auth.isLoggedIn)
    next({ name: "login" });
  else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    auth.isLoggedIn
  )
    next({ name: "dashboard" });
  else next();
});
export default router;
