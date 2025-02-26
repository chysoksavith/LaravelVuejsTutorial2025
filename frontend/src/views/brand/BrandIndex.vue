<script setup lang="ts">
import { useBrandStore } from "@/store/brandStore";
import { useCategoryStore } from "@/store/category";
import { onMounted } from "vue";

const brandsStore = useBrandStore();
const deleteBrand = async (id: number) => {
  try {
    await brandsStore.deleteBrand(id);
    router.push("/dashboard/brands");
  } catch (error) {
    console.error("Error deleting brand:", error);
  }
};
onMounted(() => {
  brandsStore.fetchBrands();
});
</script>

<template>
  <div class="container mt-4">
    <!-- CRUD Table -->
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Brands</h2>

      <RouterLink :to="{ name: 'BrandCreate' }" class="btn btn-primary"
        >Create</RouterLink
      >
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover mt-4">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="brandsStore.brands && brandsStore.brands.length">
            <tr v-for="(brand, index) in brandsStore.brands" :key="brand.id">
              <td>{{ brand.id }}</td>
              <td>{{ brand.name }}</td>
              <td>
                <img
                  v-if="brand.image"
                  :src="brand.image"
                  alt="brand Image"
                  width="100"
                />
              </td>
              <th>{{ brand.created_at }}</th>
              <td>
                <RouterLink
                  :to="{ name: 'BrandView', params: { id: brand.id } }"
                  class="btn btn-info btn-sm"
                  aria-label="View Brand"
                >
                  View
                </RouterLink>
                <RouterLink
                  :to="{ name: 'BrandEdit', params: { id: brand.id } }"
                  class="btn btn-info btn-sm"
                  aria-label="View Brand"
                >
                  Edit
                </RouterLink>
                <button
                  @click="deleteBrand(brand.id)"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          </template>

          <!-- If no categories available -->
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">No brands available</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
