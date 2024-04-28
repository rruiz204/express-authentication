<template>
  <div class="hero w-screen min-h-screen" :style="{ backgroundImage: 'url(/images/background.jpg)' }">
    <div class="hero-overlay"></div>
    <div class="hero-content text-center flex flex-col">
      <h1 class="mb-4 text-6xl font-poppins-semi">Welcome to Express Authentication</h1>
      <p class="text-xl font-poppins-regular">This project is a mini app designed to help developers learn about implementing authentication in web applications. It uses JSON Web Tokens (JWT) for authentication and is built with Express in the backend and Vue.js in the frontend.</p>
      <div class="mt-5 flex gap-5 font-semibold">
        <router-link class="border-2 w-32 py-2 rounded-lg hover:opacity-50 duration-200" to="/login">Login</router-link>
        <router-link class="border-2 w-32 py-2 rounded-lg hover:opacity-50 duration-200" to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>