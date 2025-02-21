<script setup lang="ts">
import { useProductStore } from "@/store/product";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

// Initialize the store and route
const productStore = useProductStore();
const route = useRoute();

// Handle the page query parameter, default to 1 if it's invalid or undefined
const page = ref<number>(Number(route.query.page) || 1);

// Function to fetch products based on the current page
const fetchProducts = async () => {
  await productStore.getProducts(page.value);
};

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});

// Watch for changes in the route's page query parameter and refetch products if it changes
watch(
  () => route.query.page,
  (newPage) => {
    // Make sure the newPage is a valid number
    page.value = Number(newPage) || 1; // fallback to 1 if invalid
    fetchProducts();
  }
);
</script>

<template>
  <div class="container mt-4">
    <!-- CRUD Table -->
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Product</h2>
      <RouterLink :to="{ name: 'ProductCreate' }" class="btn btn-primary">
        Create
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover mt-4">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="productStore.productCollection?.data?.length">
            <tr
              v-for="product in productStore.productCollection.data"
              :key="product.id"
            >
              <td>{{ product.id }}</td>
              <td>
                <!-- Display the category name -->
                {{ product.category?.name || "No category" }}
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.description }}</td>
              <td>
                <!-- Display the product image -->
                <img
                  v-if="product.image"
                  :src="product.image"
                  alt="Product Image"
                  width="100"
                />
              </td>
              <td>{{ product.created_at }}</td>
              <td>
                <!-- Add action buttons (e.g., Edit, Delete) -->
                <RouterLink
                  :to="{ name: 'ProductEdit', params: { id: product.id } }"
                  class="btn btn-warning"
                >
                  Edit
                </RouterLink>
                <button class="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="8" class="text-center">No products available</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <!-- <template v-if="productStore.productCollection?.links">
      <div class="d-flex justify-content-center mt-3">
        <button
          v-if="productStore.productCollection.links.prev"
          @click="
            page.value--;
            fetchProducts();
          "
          class="btn btn-secondary"
        >
          Previous
        </button>
        <button
          v-if="productStore.productCollection.links.next"
          @click="
            page.value++;
            fetchProducts();
          "
          class="btn btn-secondary ml-2"
        >
          Next
        </button>
      </div>
    </template> -->
  </div>
</template>
