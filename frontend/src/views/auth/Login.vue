<script setup lang="ts">
import axiosInstance from "@/axios";
import { reactive } from "vue";

interface LoginForm {
  email: string;
  password: string;
}

const form = reactive<LoginForm>({
  email: "",
  password: "",
});

const login = async () => {
  try {
    // Ensure CSRF cookie for Laravel Sanctum
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: "http://localhost:8000",
    });

    // Send registration request
    const response = await axiosInstance.post("/login", form);
    console.log("Registration successful:", response.data);
  } catch (error: any) {
    console.error("Error during registration:", error?.response?.data || error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Login</h2>
    <div class="card p-4">
      <form @submit.prevent="login">
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>
