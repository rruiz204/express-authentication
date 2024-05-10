<template>
  <form class="font-semibold flex flex-col gap-3" @submit="submit">
    <div class="h-24 md:h-20">
      <input type="text" placeholder="Username" v-model="username" class="w-full p-3 bg-white outline-none rounded-lg">
      <p class="text-red-600">{{ errors.username }}</p>
    </div>

    <div class="h-24 md:h-20">
      <input type="email" placeholder="Email" v-model="email" class="w-full p-3 bg-white outline-none rounded-lg">
      <p class="text-red-600">{{ errors.email }}</p>
    </div>

    <div class="h-24 md:h-20">
      <input type="password" placeholder="Password" v-model="password"
        class="w-full p-3 bg-white outline-none rounded-lg">
      <p class="text-red-600">{{ errors.password }}</p>
    </div>
    <button class="border-2 rounded-lg hover:opacity-50 duration-200 w-full py-2">
      Register
    </button>
    <p class="text-red-600">{{ response?.error }}</p>
  </form>
</template>

<script setup lang="ts">
import { IRegisterResponse } from "../../types/responses/auth";
import { IRegisterBody } from "../../types/bodies/auth";
import { defineEmits, defineProps } from "vue";
import { useForm } from "vee-validate";
import { object, string } from "yup";

const emit = defineEmits(["register"]);
defineProps<{response?: IRegisterResponse}>();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: object({
    username: string().required().min(6),
    email: string().required().email(),
    password: string().required().min(8),
  }),
  initialValues: { username: "", email: "", password: "" }
});

const [username] = defineField("username");
const [email] = defineField("email");
const [password] = defineField("password");

const submit = handleSubmit((values: IRegisterBody) => {
  emit("register", values);
});
</script>