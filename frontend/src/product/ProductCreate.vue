<script setup lang="ts">
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/product";
import { onMounted, ref } from "vue";

// Initialize the category store and product store
const categoriesStore = useCategoryStore();
const { createProduct } = useProductStore();

// Declare refs for the form fields (to bind the form data)
const name = ref("");
const category_id = ref<number | null>(null);
const price = ref(0);
const description = ref("");
const image = ref<File | null>(null); // Declare image as a ref

// Fetch categories when the component is mounted
onMounted(async () => {
  await categoriesStore.getCategories();
});

// Handle form submission
const handleSubmit = async () => {
  const payload = {
    name: name.value,
    category_id: category_id.value,
    price: price.value,
    description: description.value,
    image: image.value, // Directly attach the image file
  };

  // Call the createProduct function from your store and pass the payload
  await createProduct(payload);
};
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Create</h2>
      <RouterLink :to="{ name: 'ProductIndex' }" class="btn btn-primary">
        Back
      </RouterLink>
    </div>
    <div>
      <FormKit type="form" submit-label="Create" @submit="handleSubmit">
        <!-- name Field -->
        <FormKit
          type="text"
          label="name"
          name="name"
          class="form-control mb-3"
          :value="name"
          @input="name = $event"
        />
        <!-- Category Select Field -->
        <FormKit
          type="select"
          label="Category"
          name="category_id"
          class="form-control mb-3"
          :options="[
            { label: 'Please select a category', value: '' },
            ...(categoriesStore.categories
              ? categoriesStore.categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))
              : []),
          ]"
          :value="category_id"
          @input="category_id = $event"
        />
        <!-- price Field -->
        <FormKit
          type="number"
          label="price"
          name="price"
          class="form-control mb-3"
          :value="price"
          @input="price = $event"
        />
        <!-- image Field -->
        <FormKit
          type="file"
          label="Image"
          name="image"
          class="form-control mb-3"
          @change="(e) => (image.value = e.target.files[0])"
        />
        <!-- description Field -->
        <FormKit
          type="text"
          label="description"
          name="description"
          class="form-control mb-3"
          :value="description"
          @input="description = $event"
        />
      </FormKit>
    </div>
  </div>
</template>
