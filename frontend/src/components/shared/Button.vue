<template>
  <div>
    <button :class="styles" class="w-full rounded-lg p-3 duration-200 flex justify-center items-center gap-2">
      <div v-if="props.icon">
        <img :src="props.icon" width="18" height="18">
      </div>
      <div>
        <p>{{ props.text }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  theme: { type: String, required: true },
  icon: { type: String, required: false },
});

const background: string = (props.theme == "light") ? "bg-gray-100" : "bg-black";
const hover: string = (props.theme == "light") ? "hover:bg-gray-200" : "hover:bg-zinc-900";
const color: string = (props.theme == "light") ? "text-black" : "text-white";

const styles: string = [background, hover, color].join(" ");
</script>