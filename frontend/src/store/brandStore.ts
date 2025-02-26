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
  },
});
