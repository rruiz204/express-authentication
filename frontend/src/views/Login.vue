<template>
  <div class="w-screen h-screen flex justify-center items-center px-4">
    <div class="w-full sm:w-[440px] p-5 flex flex-col gap-8">
      <div class="text-center">
        <h1 class="font-chivo-bold text-4xl text-2xl mb-2">Login</h1>
        <p class="font-chivo-regular text-gray-400">Create your account to get started. </p>
      </div>
      <div>
        <Form></Form>
      </div>
      <div class="font-chivo-regular flex flex-col gap-3">
        <Button @click="store.redirect('google')" text="Login with Google" theme="light" icon="/svgs/google.svg"></Button>
        <Button @click="store.redirect('github')" text="Login with Github" theme="light" icon="/svgs/github.svg"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import useLoginStore from "../stores/useLoginStore";
import Form from '../components/login/Form.vue';
import Button from '../components/shared/Button.vue';

const store = useLoginStore();
const router = useRouter();
const route = useRoute();

watchEffect(async () => {
  if (route.query.code) await store.login(route.query.code as string, router);
});
</script>