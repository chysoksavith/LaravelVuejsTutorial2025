<script setup lang="ts">
import axiosInstance from "@/axios";
import { ref } from "vue";

const user = ref({
  name: "",
  email: "",
});

const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    user.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    console.error(error);
  }
};
getUser();
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <header class="py-4 mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0">Dashboard</h1>
        <div class="d-flex align-items-center">
          <span class="me-3">{{ user?.name }}</span>
          <span class="me-3">{{ user?.email }}</span>
          <button @click="logout" class="btn btn-light">Logout</button>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <div class="container">
      <p>Welcome to your dashboard!</p>
    </div>
  </div>
</template>
