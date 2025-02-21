<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import { usePostStore } from "@/store/post";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postStore = usePostStore();

watch(
  () => route.params.slug,
  (slug) => postStore.getPost(String(slug)),
  { immediate: true }
);
</script>

<template>
  <RouterLink :to="{ name: 'PostIndex' }" class="btn btn-primary"
    >back</RouterLink
  >
  <p>{{ postStore.post?.id }}</p>
  <p>{{ postStore.post?.title }}</p>
  <p>{{ postStore.post?.body }}</p>
</template>
