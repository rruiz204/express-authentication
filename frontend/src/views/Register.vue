<template>
  <div class="hero w-screen min-h-screen" :style="{ backgroundImage: 'url(/images/background.jpg)' }">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="w-[300px] md:w-[450px] h-[525px] md:h-[500px] rounded-xl bg-neutral/75 py-10 md:px-10">
        <p class="text-xl md:text-3xl font-poppins-semi text-center">Create a New Account</p>
        <div class="mt-7 p-5">
          <Form @register="register" :response="response"></Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IRegisterResponse } from '../types/responses/auth';
import { IRegisterBody } from '../types/bodies/auth';
import AuthService from '../services/AuthService';
import Form from '../components/register/Form.vue';
import { reactive } from 'vue';

const response: IRegisterResponse = reactive({});

async function register(data: IRegisterBody) {
  console.log("probandoooooooo", data);
  const jeje = await AuthService.register(data);
  console.log(jeje);
}
</script>