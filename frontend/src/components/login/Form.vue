<template>
  <form class="font-semibold flex flex-col gap-3">
    <div class="h-24 md:h-20">
      <input type="email" placeholder="Email" v-model="email"
        class="w-full p-3 bg-white outline-none rounded-lg">
      <p class="text-red-600">{{ errors.email }}</p>
    </div>

    <div class="h-24 md:h-20">
      <input type="password" placeholder="Password" v-model="password"
        class="w-full p-3 bg-white outline-none rounded-lg">
      <p class="text-red-600">{{ errors.password }}</p>
    </div>
    <Button text="Register" size="w-full"></Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { object, string } from "yup";

const { errors, defineField } = useForm({
  validationSchema: object({
    email: string().required().email(),
    password: string().required().min(8),
  }),
  initialValues: { email: "", password: "" }
});

const [email] = defineField("email");
const [password] = defineField("password");
</script>