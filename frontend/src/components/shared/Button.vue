<template>
  <button class="border-2 rounded-lg hover:opacity-50 duration-200 py-2" :class="props?.size">
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  size: { type: String, required: false },
});
</script>