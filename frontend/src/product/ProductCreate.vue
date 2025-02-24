<script setup lang="ts">
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/product";
import { onMounted, ref, computed } from "vue";
import type { FormKitFile } from "@formkit/core";

// Initialize stores
const categoriesStore = useCategoryStore();
const { createProduct } = useProductStore();

// Form fields
const name = ref("");
const category_id = ref<number | null>(null);
const price = ref<number | string>("0");
const description = ref("");
const image = ref<File | null>(null); // Store image file

// Fetch categories when the component is mounted
onMounted(async () => {
  await categoriesStore.getCategories();
  console.log("Fetched Categories:", categoriesStore.categories); // Debugging
});

// Handle file selection
const handleFileUpload = (value: FormKitFile[] | undefined) => {
  if (value && value.length > 0) {
    const file = value[0] as unknown as File;

    // Check if file type is valid
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Invalid file type! Please upload a JPEG or PNG image.");
      return;
    }

    image.value = file;
  }
};

// Handle form submission
const handleSubmit = async (_data: unknown, node?: any) => {
  const formData = new FormData();
  formData.append("name", name.value);
  if (category_id.value !== null) {
    formData.append("category_id", category_id.value.toString());
  }
  formData.append("price", price.value.toString());
  if (description.value) {
    formData.append("description", description.value);
  }
  if (image.value) {
    formData.append("image", image.value);
  }

  console.log("Submitting Form Data:", Object.fromEntries(formData.entries())); // Debugging

  await createProduct(formData, node);
};
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Create Product</h2>
      <RouterLink :to="{ name: 'ProductIndex' }" class="btn btn-primary">
        Back
      </RouterLink>
    </div>
    <div>
      <FormKit type="form" submit-label="Create" @submit="handleSubmit">
        <!-- Name Field -->
        <FormKit
          type="text"
          label="Name"
          name="name"
          class="form-control mb-3"
          v-model="name"
        />

        <!-- Category Select Field -->
        <FormKit
          type="select"
          label="Category"
          name="category_id"
          class="form-control mb-3"
          v-model="category_id"
          :options="[
            { label: 'Please select a category', value: null },
            ...(categoriesStore.categories ?? []).map((category) => ({
              label: category.name,
              value: category.id,
            })),
          ]"
        />

        <!-- Price Field -->
        <FormKit
          type="number"
          label="Price"
          name="price"
          class="form-control mb-3"
          v-model="price"
        />

        <!-- Image Upload Field -->
        <FormKit
          type="file"
          label="Image"
          name="image"
          class="form-control mb-3"
          @input="handleFileUpload"
        />

        <!-- Description Field -->
        <FormKit
          type="text"
          label="Description"
          name="description"
          class="form-control mb-3"
          v-model="description"
        />
      </FormKit>
    </div>
  </div>
</template>
