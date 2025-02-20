<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const { login } = useAuthStore();
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Login</h2>
    <div class="card p-4 shadow-sm rounded-lg">
      <FormKit
        type="form"
        submit-label="Login"
        @submit="login"
        class="form-kit"
      >
        <!-- Email Field -->
        <FormKit
          type="email"
          label="Email address"
          name="email"
          class="form-control mb-3"
        />
        <!-- Password Field -->
        <FormKit
          type="password"
          label="Password"
          name="password"
          class="form-control mb-3"
        />
      </FormKit>
    </div>
  </div>
</template>
