<script setup lang="ts">
import { useCategoryStore } from "@/store/category";
import { computed, watch } from "vue";
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
</script>

<template>
  <RouterLink
    :to="{ name: 'CategoryIndex' }"
    class="btn btn-primary"
  >back</RouterLink>
  <div v-if="categoryStore.selectedCategory">
    <p><strong>ID:</strong> {{ categoryStore.selectedCategory.id }}</p>
    <p><strong>Name:</strong> {{ categoryStore.selectedCategory.name }}</p>
  </div>
  <p v-else>Loading category...</p>
</template>
