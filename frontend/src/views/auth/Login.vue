<script setup lang="ts">
import axiosInstance from "@/axios";
import { AxiosError } from "axios";
import { reactive } from "vue";

interface LoginForm {
  email: string;
  password: string;
}

const form = reactive<LoginForm>({
  email: "",
  password: "",
});

const errors = reactive({
  email: [],
  password: [],
});

const login = async (payload: LoginForm) => {
  // Ensure CSRF cookie for Laravel Sanctum
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: "http://localhost:8000",
  });
  errors.email = [];
  errors.password = [];

  try {
    // Send login request
    await axiosInstance.post("/login", payload);
    // Optionally, handle success (e.g., redirect or show a message)
  } catch (e: any) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      // Update errors based on backend validation response
      errors.email = e.response.data.errors?.email || [];
      errors.password = e.response.data.errors?.password || [];
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Login</h2>
    <div class="card p-4">
      <form @submit.prevent="login(form)">
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
            :class="{ 'is-invalid': errors.email.length > 0 }"
          />
          <!-- Display error message for email -->
          <template v-if="errors.email.length">
            <div
              v-for="error in errors.email"
              :key="error"
              class="invalid-feedback"
            >
              {{ error }}
            </div>
          </template>
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
            :class="{ 'is-invalid': errors.password.length > 0 }"
          />
          <!-- Display error message for password -->
          <template v-if="errors.password.length">
            <div
              v-for="error in errors.password"
              :key="error"
              class="invalid-feedback"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>
