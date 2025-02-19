<script setup lang="ts">
import axiosInstance from "@/axios";
import { AxiosError } from "axios";
import { reactive } from "vue";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const form = reactive<RegisterForm>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = reactive({
  name: [],
  email: [],
  password: [],
});

const register = async () => {
  try {
    // Ensure CSRF cookie for Laravel Sanctum
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: "http://localhost:8000",
    });
    errors.name = [];
    errors.email = [];
    errors.password = [];
    // Send registration request
    await axiosInstance.post("/register", form);
  } catch (e: any) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      errors.name = e.response.data.errors.name || [];
      errors.email = e.response.data.errors.email || [];
      errors.password = e.response.data.errors.password || [];
      console.log(errors); // Debugging - Check if errors are correctly populated
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Register</h2>
    <div class="card p-4">
      <form @submit.prevent="register">
        <!-- Name -->
        <div class="mb-3">
          <label for="name" class="form-label">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your full name"
            :class="{ 'is-invalid': errors.name.length > 0 }"
          />
          <template v-if="errors.name && errors.name.length">
            <div
              v-for="error in errors.name"
              :key="error"
              class="invalid-feedback d-block"
            >
              {{ error }}
            </div>
          </template>
        </div>

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
          <template v-if="errors.email && errors.email.length">
            <div
              v-for="error in errors.email"
              :key="error"
              class="invalid-feedback d-block"
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
          <template v-if="errors.password && errors.password.length">
            <div
              v-for="error in errors.password"
              :key="error"
              class="invalid-feedback d-block"
            >
              {{ error }}
            </div>
          </template>
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="password_confirmation" class="form-label"
            >Confirm Password</label
          >
          <input
            v-model="form.password_confirmation"
            type="password"
            class="form-control"
            id="password_confirmation"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>
    </div>
  </div>
</template>
