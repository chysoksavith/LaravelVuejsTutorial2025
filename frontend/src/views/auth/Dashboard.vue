<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const auth = useAuthStore();
onMounted(() => {
  if (!auth.isLoggedIn) auth.getUser();
});
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <header class="py-4 mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0">Dashboard</h1>
        <div class="d-flex align-items-center">
          <span class="me-3">{{ auth.user?.name }}</span>
          <span class="me-3">{{ auth.user?.email }}</span>
          <button @click="auth.logout" class="btn btn-light">Logout</button>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <div class="container">
      <p>Welcome to your dashboard!</p>
    </div>
  </div>
</template>
