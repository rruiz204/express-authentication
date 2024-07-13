<template>
  <div>
    <form @submit="onSubmit" class="font-chivo-regular">
      <div class="flex flex-col gap-2 mb-4">
        <Input v-model:field="email" type="email" label="Email"
          label-icon="/svgs/email.svg" placeholder="m@example.com" :error="errors.email">
        </Input>
        <Input v-model:field="password" type="password" auxiliar-type="text"
          label="Password" label-icon="/svgs/lock.svg" :error="errors.password" 
          input-icon="/svgs/eye.svg" auxiliar-icon="/svgs/eye-slash.svg">
        </Input>
      </div>
      <Button icon="/svgs/loading.svg" icon-class="animate-spin" text="Login" theme="dark"></Button>
      <p class="text-red-600 text-center mt-4" v-if="error">{{ error }}</p>
      <router-link class="text-gray-400 text-center mt-4 block" to="/register">Don't have an account? Create it here</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from '../shared/Input.vue';
import Button from '../shared/Button.vue';
import validation from './validation';
import AuthDirector from '../../authentication/AuthDirector';
import { useForm } from "vee-validate";
import { LoginBodyDTO } from '../../dto/AuthenticationDTO';

const { login, error, setService } = AuthDirector();

const { defineField, errors, handleSubmit } = useForm<LoginBodyDTO>({
  validationSchema: validation
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  setService("local");
  await login(values);
  resetForm();
});
</script>