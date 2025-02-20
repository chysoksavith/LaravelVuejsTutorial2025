<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
type Post = {
  id: number;
  title: string;
  body: string;
  is_published: boolean;
  createdAt: string;
};
const route = useRoute();
const post = ref<Post | null>(null);
const getPost = async (id: string | string[]) => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/posts/${id}`);
    post.value = data.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
watch(
  () => route.params.id,
  (id) => getPost(id),
  { immediate: true }
);
</script>

<template>
  <p>{{ post?.id }}</p>
  <p>{{ post?.title }}</p>
  <p>{{ post?.body }}</p>
</template>
