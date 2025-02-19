<script setup lang="ts">
import axiosInstance from "@/axios";
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

const register = async () => {
  try {
    // Ensure CSRF cookie for Laravel Sanctum
    await axiosInstance.get("/sanctum/csrf-cookie", {
      baseURL: "http://localhost:8000",
    });

    // Send registration request
    const response = await axiosInstance.post("/register", form);
    console.log("Registration successful:", response.data);
  } catch (error: any) {
    console.error("Error during registration:", error?.response?.data || error);
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
          />
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
