<template>
  <div>
    <p>testing page</p>
    <p>the value of the counter is: {{ store.count }}</p>
    <button class="p-2 m-2 bg-black text-white font-bold rounded-xl"
      @click="store.increment">
      Increment
    </button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '../stores/useCounterStore';

const store = useCounterStore();
</script>