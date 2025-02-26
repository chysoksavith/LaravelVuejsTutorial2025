<script setup lang="ts">
import router from "@/router";
import { useBrandStore } from "@/store/brandStore";
import { ref } from "vue";

const brandStore = useBrandStore();
const name = ref("");
const image = ref<File | null>(null);

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    image.value = input.files[0];
  }
};

const createBrand = async () => {
  await brandStore.createBrand(name.value, image.value);
  router.push("/dashboard/brands");
};
</script>
<template>
  <div class="container mt-4">
    <div class="card shadow-lg p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="text-primary">Create Brand</h2>
        <RouterLink
          :to="{ name: 'BrandIndex' }"
          class="btn btn-outline-primary"
        >
          Back
        </RouterLink>
      </div>

      <form @submit.prevent="createBrand">
        <!-- Brand Name -->
        <div class="mb-3">
          <label for="brandName" class="form-label">Brand Name</label>
          <input
            type="text"
            id="brandName"
            v-model="name"
            class="form-control"
            placeholder="Enter brand name"
            required
          />
        </div>

        <!-- Image Upload -->
        <div class="mb-3">
          <label for="brandImage" class="form-label">Brand Image</label>
          <input
            type="file"
            id="brandImage"
            class="form-control"
            @change="handleImageChange"
          />
        </div>

        <!-- Submit Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i> Create Brand
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
