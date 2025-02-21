import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { Category, categoryForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("categories", () => {
  const categories = ref<Category[] | null>(null);
  const selectedCategory = ref<Category | null>(null);
  const isLoading = ref<boolean>(false);

  const getCategories = async () => {
    isLoading.value = true;
    try {
      const { data } = await axiosInstance.get("/dashboard/categories");
      categories.value = data.data; // Assign fetched data to categories
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  const getCategory = async (id: number) => {
    if (!id) return;
    isLoading.value = true;
    try {
      const { data } = await axiosInstance.get(`/dashboard/categories/${id}`);
      selectedCategory.value = data.data;
      console.log(selectedCategory);
    } catch (error) {}
  };
  const createCategory = async (payload: categoryForm, node?: FormKitNode) => {
    try {
      await axiosInstance.post("/dashboard/categories", payload);
      await router.push("/dashboard/categories");
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors([], e.response?.data.errors);
      }
    }
  };
  const updateCategory = async (
    id: number,
    payload: categoryForm,
    node?: FormKitNode
  ) => {
    try {
      const response = await axiosInstance.put(
        `/dashboard/categories/${id}`,
        payload
      );
      await router.push("/dashboard/categories");
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 422) {
        node?.setErrors([], e.response?.data.errors);
      }
    }
  };
  const deleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return; // Confirm before deleting

    try {
      await axiosInstance.delete(`/dashboard/categories/${id}`);
      await getCategories(); // Refresh the category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return {
    deleteCategory,
    categories,
    selectedCategory,
    isLoading,
    getCategories,
    createCategory,
    updateCategory,
    getCategory,
  };
});
