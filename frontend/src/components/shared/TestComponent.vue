<template>
  <div>
    <button @click="emitTest">test me!</button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(["tets"]);

function emitTest() {
  emit("tets", "it is working!");
};
</script>