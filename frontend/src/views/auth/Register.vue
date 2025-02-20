<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const { register } = useAuthStore();
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Register</h2>
    <div class="card p-4 shadow-sm rounded-lg">
      <FormKit
        type="form"
        submit-label="Login"
        @submit="register"
        class="form-kit"
        ><!-- name Field -->
        <FormKit
          type="text"
          label="Name address"
          name="name"
          class="form-control mb-3"
        />
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
        <!-- Password Field -->
        <FormKit
          type="password"
          label="password_confirmation"
          name="password_confirmation"
          class="form-control mb-3"
        />
      </FormKit>
    </div>
  </div>
</template>
