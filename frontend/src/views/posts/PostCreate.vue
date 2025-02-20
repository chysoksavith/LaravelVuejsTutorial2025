<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import router from "@/router";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

type PostForm = {
  title: string;
  body: string;
};
const createPost = async (payload: PostForm, node?: FormKitNode) => {
  try {
    await axiosInstance.post("/dashboard/posts", payload);
    router.push("/dashboard/posts");
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      node?.setErrors([], e.response?.data.errors);
    }
  }
};
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="text-center">Create</h2>
      <RouterLink :to="{ name: 'PostIndex' }" class="btn btn-primary"
        >back</RouterLink
      >
    </div>
    <div>
      <FormKit type="form" submit-label="Create" @submit="createPost">
        <!-- title Field -->
        <FormKit
          type="text"
          label="title"
          name="title"
          class="form-control mb-3"
        />
        <!-- body Field -->
        <FormKit
          type="text"
          label="body"
          name="body"
          class="form-control mb-3"
        />
      </FormKit>
    </div>
  </div>
</template>
