<template>
  <div class="w-screen h-screen flex justify-center items-center px-4">
    <div class="w-full sm:w-[440px] p-5 flex flex-col gap-8">
      <div class="text-center">
        <h1 class="font-chivo-bold text-4xl text-2xl mb-2">Sign Up</h1>
        <p class="font-chivo-regular text-gray-400">Create your account to get started. </p>
      </div>
      <div>
        <Form></Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from '../components/register/Form.vue';
</script>