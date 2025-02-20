import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Dashboard from "@/views/auth/Dashboard.vue";
import { useAuthStore } from "@/store/auth";
import PostIndex from "@/views/posts/PostIndex.vue";
import PostCreate from "@/views/posts/PostCreate.vue";

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
