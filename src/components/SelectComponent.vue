<template>
  <select
    v-model="model"
    class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
  >
    <option
      disabled
      value=""
    >
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      class="text-base text-gray-700"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue'

const props = defineProps({
  options: {
    type: [],
    default: () => ([]),
    validator: (value) => value.every(option => 'label' in option && 'value' in option),
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
})

const model = defineModel < string | number >('model')

watch(() => props.modelValue, (newValue) => {
  model.value = newValue
})
</script>
