<template>
  <div>
    <form @submit="onSubmit" class="font-chivo-regular">
      <div class="flex flex-col gap-2 mb-4">
        <Input v-model:field="username" type="text" label="Username"
          label-icon="/svgs/user.svg" placeholder="johndoe" :error="errors.username">
        </Input>
        <Input v-model:field="email" type="email" label="Email"
          label-icon="/svgs/email.svg" placeholder="m@example.com" :error="errors.email">
        </Input>
        <Input v-model:field="password" type="password" auxiliar-type="text"
          label="Password" label-icon="/svgs/lock.svg" :error="errors.password" 
          input-icon="/svgs/eye.svg" auxiliar-icon="/svgs/eye-slash.svg">
        </Input>
      </div>
      <Button text="Sign up" theme="dark"></Button>
      <p class="text-red-600 text-center mt-4" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import Input from "../shared/Input.vue";
import Button from "../shared/Button.vue";
import validation from "./validation";
import useFetch from "../../hooks/useFetch";
import LocalAuthService from "../../services/authentication/LocalAuthService";
import { useForm } from "vee-validate";
import { AuthDataDTO, RegisterBodyDTO } from "../../dto/AuthenticationDTO";

const { error, execute } = useFetch<AuthDataDTO, RegisterBodyDTO>()

const { defineField, errors, handleSubmit } = useForm<RegisterBodyDTO>({
  validationSchema: validation
});

const [username] = defineField("username");
const [email] = defineField("email");
const [password] = defineField("password");

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  await execute(LocalAuthService.register, values);
  resetForm();
});
</script>