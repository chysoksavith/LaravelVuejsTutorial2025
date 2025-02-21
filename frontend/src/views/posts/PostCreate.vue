<script setup lang="ts">
import { usePostStore } from "@/store/post";

const { createPost } = usePostStore();
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Create</h2>
      <RouterLink :to="{ name: 'PostIndex' }" class="btn btn-primary"
        >back</RouterLink
      >
    </div>
    <div>
      <FormKit type="form" submit-label="Create" @submit="createPost">
        <!-- title Field -->
        <FormKit
          type="text"
          label="title"
          name="title"
          class="form-control mb-3"
        />
        <!-- body Field -->
        <FormKit
          type="text"
          label="body"
          name="body"
          class="form-control mb-3"
        />
      </FormKit>
    </div>
  </div>
</template>
