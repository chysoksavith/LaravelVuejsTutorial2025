import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { LaravelResponseCollection, Product, ProductForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
  const productCollection = ref<LaravelResponseCollection<Product> | null>(
    null
  );
  const product = ref<Product | null>(null);
  const isLoading = ref(false);

  // Fetch products
  const getProducts = async (page: number) => {
    isLoading.value = true;
    try {
      const { data } = await axiosInstance.get(
        `/dashboard/products?page=${page}`
      );
      productCollection.value = data;
      console.log("Fetched Products:", data.data);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  // Create product with image upload
  const createProduct = async (formData: FormData, node?: FormKitNode) => {
    try {
      await axiosInstance.post("/dashboard/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await router.push("/dashboard/products");
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors([], e.response?.data.errors);
      }
    }
  };

  return {
    productCollection,
    product,
    isLoading,
    getProducts,
    createProduct,
  };
});
