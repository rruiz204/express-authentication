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
      <Button text="Login" theme="dark"></Button>
      <p class="text-red-600 text-center mt-4" v-if="error">{{ error }}</p>
      <router-link class="text-gray-400 text-center mt-4 block" to="/register">Don't have an account? Create it here</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from '../shared/Input.vue';
import Button from '../shared/Button.vue';
import useFetch from "../../hooks/useFetch";
import Options from "../../utils/options";
import validation from './validation';
import { useForm } from "vee-validate";
import { IAuthBody } from "../../types/bodies/auth";
import { IAuthResponse } from "../../types/responses/auth";

const { error, fetcher } = useFetch();

const { defineField, errors, handleSubmit } = useForm<IAuthBody>({
  validationSchema: validation
});

const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const options = Options.withBody<IAuthBody>("POST", values);
  await fetcher<IAuthResponse>("/auth/register", options);
  resetForm();
});
</script>