<template>
  <div>
    <p>testing page</p>
    <TestComponent @tets="handle"></TestComponent>
  </div>
</template>

<script setup lang="ts">
import TestComponent from '../components/shared/TestComponent.vue';

function handle(message: string) {
  console.log(message);
}
</script>