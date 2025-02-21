<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="bg-primary py-3">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Greeting -->
      <HelloWorld msg="You did it!" class="fw-bold fs-4" />

      <!-- Navigation Links -->
      <nav>
        <RouterLink to="/" class="text-decoration-none text-light mx-3"
          >Home</RouterLink
        >
        <RouterLink to="/dashboard" class="text-decoration-none text-light mx-3"
          >Dashboard</RouterLink
        >
        <RouterLink
          to="/dashboard/posts"
          class="text-decoration-none text-light mx-3"
          >Posts</RouterLink
        >
        <RouterLink
          to="/dashboard/categories"
          class="text-decoration-none text-light mx-3"
          >Category</RouterLink
        >
        <RouterLink to="/login" class="text-decoration-none text-light mx-3"
          >Login</RouterLink
        >
        <RouterLink to="/register" class="text-decoration-none text-light mx-3"
          >Register</RouterLink
        >
        <RouterLink to="/about" class="text-decoration-none text-light mx-3"
          >About</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>
