<script setup lang="ts">
import { usePostStore } from "@/store/post";
import type { postForm } from "@/types";
import type { FormKitNode } from "@formkit/core";
import { watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postStore = usePostStore();
const handleUpdate = (payload: postForm, node?: FormKitNode) => {
  postStore.updatePost(String(route.params.slug), payload, node);
};
watch(
  () => route.params.slug,
  (slug) => postStore.getPost(String(slug)),
  { immediate: true }
);
</script>
<template>
  <section v-if="postStore.post">
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h2 class="text-center">Update</h2>
        <RouterLink :to="{ name: 'PostIndex' }" class="btn btn-primary"
          >back</RouterLink
        >
      </div>
      <div>
        <FormKit type="form" submit-label="Update" @submit="handleUpdate">
          <!-- title Field -->
          <FormKit
            type="text"
            label="title"
            name="title"
            class="form-control mb-3"
            :value="postStore.post.title"
          />
          <!-- body Field -->
          <FormKit
            type="text"
            label="body"
            name="body"
            class="form-control mb-3"
            :value="postStore.post.body"
          />
        </FormKit>
      </div>
    </div>
  </section>
</template>
