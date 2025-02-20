<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import { onMounted, ref } from "vue";
import { Bootstrap5Pagination } from "laravel-vue-pagination"; // If you use this package
type Post = {
  id: number;
  title: string;
  body: string;
  is_published: boolean;
};

const posts = ref<Post[]>([]); // Store posts data
const laravelData = ref<any>({}); // To hold pagination data

// Function to fetch results with pagination
const getResults = async (page = 1) => {
  const { data } = await axiosInstance.get(`/dashboard/posts?page=${page}`);
  laravelData.value = data; // Store the whole response
  posts.value = data.data; // Store the posts part of the response
};

// Fetch data when the component is mounted
onMounted(async () => {
  await getResults();
});
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="posts.length">
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
              <td>{{ post.is_published ? "Yes" : "No" }}</td>
              <td>
                <!-- Action buttons like Edit and Delete (optional) -->
                <!-- <button
                  class="btn btn-warning btn-sm me-2"
                  @click="editProduct"
                >
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteProduct">
                  Delete
                </button> -->
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">No posts available</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Bootstrap5Pagination
      :data="laravelData"
      @pagination-change-page="getResults"
    />
  </div>
</template>
