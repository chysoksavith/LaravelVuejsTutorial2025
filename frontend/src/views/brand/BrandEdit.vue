<script setup lang="ts">
import router from "@/router";
import { useBrandStore } from "@/store/brandStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const brandStore = useBrandStore();
const route = useRoute();
const id = parseInt(route.params.id as string);

const name = ref("");
const image = ref<File | null>(null);
const imageUrl = ref<String | null>(null);
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    image.value = input.files[0];

    imageUrl.value = URL.createObjectURL(image.value);
  }
};

const fetchBrand = async () => {
  try {
    await brandStore.fetchBrands();
    const brand = brandStore.brands.find((brand) => brand.id === id);
    if (brand) {
      name.value = brand.name;
      imageUrl.value = brand.image ? brand.image : null;
    }
  } catch (error) {
    console.error("Error fetching brand:", error);
  }
};
const updateBrand = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  if (image.value) formData.append("image", image.value);

  try {
    await brandStore.updateBrand(id, formData); // Pass FormData to the store method
    router.push("/dashboard/brands"); // Redirect after successful update
  } catch (error) {
    console.error("Error updating brand:", error);
  }
};

onMounted(fetchBrand);
</script>
<template>
  <div class="container mt-4">
    <div class="card shadow-lg p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="text-primary">Edit Brand</h2>
        <RouterLink
          :to="{ name: 'BrandIndex' }"
          class="btn btn-outline-primary"
        >
          Back
        </RouterLink>
      </div>

      <form @submit.prevent="updateBrand">
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
        <div v-if="imageUrl" class="mb-3">
          <label class="form-label">Current Brand Image</label>
          <img
            :src="imageUrl"
            alt="Brand Image"
            class="img-fluid"
            style="max-height: 200px; object-fit: contain"
          />
        </div>

        <!-- Submit Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i> Update Brand
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
