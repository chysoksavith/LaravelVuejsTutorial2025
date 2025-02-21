<script setup lang="ts">
import { useCategoryStore } from "@/store/category";
import { onMounted } from "vue";

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.getCategories();
});
</script>

<template>
  <div class="container mt-4">
    <!-- CRUD Table -->
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Categories</h2>
      <RouterLink :to="{ name: 'CategoryCreate' }" class="btn btn-primary">
        Create
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover mt-4">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template
            v-if="categoryStore.categories && categoryStore.categories.length"
          >
            <tr
              v-for="(category, index) in categoryStore.categories"
              :key="category.id"
            >
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.created_at }}</td>
              <td>
                <RouterLink
                  :to="{ name: 'CategoryView', params: { id: category.id } }"
                  class="btn btn-info btn-sm"
                  aria-label="View Category"
                >
                  View
                </RouterLink>
                <RouterLink
                  :to="{ name: 'CategoryEdit', params: { id: category.id } }"
                  class="btn btn-info btn-sm"
                  aria-label="View Category"
                >
                  Edit
                </RouterLink>
                <button
                  class="btn btn-danger btn-sm"
                  @click="categoryStore.deleteCategory(category.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </template>

          <!-- If no categories available -->
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">No categories available</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
