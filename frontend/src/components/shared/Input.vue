<template>
  <div class="h-[100px]">
    <div class="flex items-center gap-1 mb-1">
      <img :src="props.labelIcon" width="13" height="13">
      <label :for="props.label">{{ props.label }}</label>
    </div>
    <div class="border rounded-lg w-full flex items-center mb-1">
      <input id="props.label" :type="flag ? props.type : props.auxiliarType"
        :placeholder="props.placeholder" v-model="field"
        class="outline-none rounded-lg p-2" :class="inputIcon ? 'w-[90%]' : 'w-full'">
      <div @click="changeIcon" v-if="props.inputIcon" class="rounded-lg hover:bg-zinc-200 duration-200">
        <img class="m-1" :src="flag ? inputIcon : auxiliarIcon" width="18" height="18">
      </div>
    </div>
    <p class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineModel, defineProps, ref } from 'vue';

const field = defineModel("field");

const flag = ref(true);

function changeIcon() {
  flag.value = !flag.value;
};

const props = defineProps({
  type: { type: String, required: true },
  auxiliarType: { type: String, required: false },
  label: { type: String, required: true },
  placeholder: { type: String, required: false },
  error: { type: String, required: false },
  labelIcon: { type: String, required: false },
  inputIcon: { type: String, required: false },
  auxiliarIcon: { type: String, required: false },
});
</script>
