<script setup lang="ts">
import { useCategoryStore } from "@/store/category";

const { createCategory } = useCategoryStore();
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Create</h2>
      <RouterLink :to="{ name: 'CategoryIndex' }" class="btn btn-primary"
        >back</RouterLink
      >
    </div>
    <div>
      <FormKit type="form" submit-label="Create" @submit="createCategory">
        <!-- name Field -->
        <FormKit
          type="text"
          label="name"
          name="name"
          class="form-control mb-3"
        />
      </FormKit>
    </div>
  </div>
</template>
