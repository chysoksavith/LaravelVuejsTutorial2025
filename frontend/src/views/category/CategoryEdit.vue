<script setup lang="ts">
import { useCategoryStore } from "@/store/category";
import type { categoryForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { watch, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const categoryStore = useCategoryStore();

const categoryId = computed(() => Number(route.params.id) || null);

// Fetch category when `route.params.id` changes
watch(
  categoryId,
  (id) => {
    if (id) categoryStore.getCategory(id);
  },
  { immediate: true }
);

// Handle category update
const handleUpdate = (payload: categoryForm, node?: FormKitNode) => {
  if (categoryId.value) {
    categoryStore.updateCategory(categoryId.value, payload, node);
  }
};
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Edit Category</h2>
      <RouterLink :to="{ name: 'CategoryIndex' }" class="btn btn-primary">
        Back
      </RouterLink>
    </div>

    <div v-if="categoryStore.selectedCategory">
      <FormKit type="form" submit-label="Update" @submit="handleUpdate">
        <!-- Name Field -->
        <FormKit
          type="text"
          label="Name"
          name="name"
          class="form-control mb-3"
          :value="categoryStore.selectedCategory?.name"
        />
      </FormKit>
    </div>

    <p v-else>Loading category...</p>
  </div>
</template>
