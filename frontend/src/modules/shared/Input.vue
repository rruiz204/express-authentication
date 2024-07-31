<template>
  <div class="h-[75px]">
    <div class="flex items-center border-2 rounded-lg px-2 mb-2" :class="props.widht">
      <div :class="props.icon ? 'w-[94%]' : 'w-full'">
        <input :type="flag ? props.type : props.auxiliar" v-model="field"
          class="w-full py-2 outline-none" :placeholder="props.placeholder">
      </div>
      <div @click="changeIcon" v-if="props.icon" class="rounded-lg hover:bg-zinc-200 duration-200">
        <img :src="flag ? props.icon : props.second" width="18" height="18" class="m-1">
      </div>
    </div>
    <p class="text-red-600 px-1">{{ Capitalize(props.error) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Capitalize from "../../utils/Capitalize";

const field = defineModel("field");
const flag = ref(true);
const changeIcon = () => flag.value = !flag.value;

const props = defineProps({
  type: { type: String, required: true },
  auxiliar: { type: String, required: false },
  placeholder: { type: String, required: true },
  widht: { type: String, required: true },
  icon: { type: String, required: false },
  second: { type: String, required: false },
  error: { type: String, required: false },
});
</script>