<template>
  <div @click="clicker" class="font-poppins-regular">
    <button :class="`${props.width} ${colors}`" class="p-2 rounded-md flex justify-center items-center gap-2">
      <div v-if="props.icon && props.visibility">
        <img :class="props.class" :src="props.icon" width="18" height="18">
      </div>
      <div>
        <p>{{ props.text }}</p>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  width: { type: String, required: true },
  icon: { type: String, required: false },
  class: { type: String, required: false },
  visibility: { type: Boolean, required: false, default: true }
});

const colors = "bg-black text-white hover:bg-zinc-900 duration-200";
const emit = defineEmits(["event:click"]);
const clicker = () => emit("event:click");
</script>