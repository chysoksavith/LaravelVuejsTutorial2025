<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/store/post";

const postStore = usePostStore();
const route = useRoute();
const router = useRouter();
const page = ref<number>(Number(route.query.page) || 1);

// Fetch data when the component is mounted or page changes
const fetchPosts = async () => {
  await postStore.getPosts(page.value);
};

onMounted(fetchPosts);

// Automatically fetch new posts when `page` changes
watchEffect(fetchPosts);
</script>

<template>
  <div class="container mt-4">
    <!-- CRUD Table -->
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Posts</h2>
      <RouterLink :to="{ name: 'PostCreate' }" class="btn btn-primary">
        Create
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover mt-4">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Is published</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="postStore.postCollection?.data?.length">
            <tr v-for="post in postStore.postCollection.data" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
              <td>{{ post.is_published ? "Yes" : "No" }}</td>
              <td>{{ post.createdAt }}</td>
              <td>
                <RouterLink
                  :to="{ name: 'PostView', params: { slug: post.slug } }"
                  class="btn btn-info btn-sm me-2"
                  >View</RouterLink
                >
                <RouterLink
                  :to="{ name: 'PostEdit', params: { slug: post.slug } }"
                  class="btn btn-warning btn-sm me-2"
                  >Edit</RouterLink
                >
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="6" class="text-center">No posts available</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <template v-if="postStore.postCollection">
      <Bootstrap5Pagination
        :data="postStore.postCollection"
        @pagination-change-page="(newPage) => (page = newPage)"
      />
    </template>
  </div>
</template>
