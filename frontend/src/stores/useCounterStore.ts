import { defineStore } from "pinia";
import { computed, ref } from "vue";

// Pinia with Composition API
const useCounterStore = defineStore("counter", () => {
  // State
  const count = ref(0);

  // Getters
  const getCount = computed(() => count);

  // Actions
  function increment() {
    count.value++;
  }

  return { count, getCount, increment }
});

export default useCounterStore;