import axiosInstance from "@/axios";
import router from "@/router";
import type { LoginForm, RegisterForm, User } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoggedIn = ref<boolean>(false);

  //   register
  const register = async (payload: RegisterForm, node?: FormKitNode) => {
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: "http://localhost:8000",
    });

    try {
      await axiosInstance.post("/register", payload);
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors([], e.response?.data.errors);
      }
    }
  };
  //   login
  const login = async (payload: LoginForm, node?: FormKitNode) => {
    // Ensure CSRF cookie for Laravel Sanctum
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: "http://localhost:8000",
    });

    try {
      // Send login request
      await axiosInstance.post("/login", payload);
      router.push("/dashboard");
    } catch (e: any) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors([], e.response?.data.errors);
      }
    }
  };
  // getUser
  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/user");
      user.value = response.data;
      isLoggedIn.value = true;
    } catch (error) {
      console.error(error);
    }
  };
  // logout
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
      user.value = null;
      isLoggedIn.value = false;
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    isLoggedIn,
    register,
    login,
    getUser,
    logout,
  };
});
