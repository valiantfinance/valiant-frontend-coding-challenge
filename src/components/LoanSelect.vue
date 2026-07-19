<script setup>
const modelValue = defineModel({
  type: [String, Number],
  default: '',
})

defineProps({
  options: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <select v-model="modelValue">
    <option
      value=""
      disabled
      hidden
    >
      Select an option...
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.annualRate ?? option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
