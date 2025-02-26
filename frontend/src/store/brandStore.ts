import axiosInstance from "@/lib/axios";
import { defineStore } from "pinia";

export const useBrandStore = defineStore("brands", {
  state: () => ({
    brands: [] as any[],
    brand: {} as any,
  }),
  actions: {
    async fetchBrands() {
      try {
        const response = await axiosInstance.get("/dashboard/brands");
        this.brands = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
    // create
    async createBrand(name: string, image: File | null) {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
      try {
        const response = await axiosInstance.post(
          "/dashboard/brands",
          formData
        );
        this.brand.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    // update
    async updateBrand(id: number, formData: FormData) {
      try {
        const response = await axiosInstance.put(
          `/dashboard/brands/${id}`,
          formData
        );

        // Find the brand in the local state and update it
        const index = this.brands.findIndex((brand) => brand.id === id);
        if (index !== -1) {
          this.brands[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating brand:", error);
      }
    },
    // delete
    async deleteBrand(id: number) {
      try {
        await axiosInstance.delete(`/dashboard/brands/${id}`);
        this.brands = this.brands.filter((brand) => brand.id !== id);
      } catch (error) {
        console.error("Error updating brand:", error);
      }
    },
  },
});
