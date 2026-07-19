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
  placeholder: {
    type: String,
    default: 'Select option',
  },
})
</script>

<template>
  <select
    v-model="modelValue"
    required
    class="min-w-52 appearance-none border-b border-dashed border-gray-900 bg-transparent px-1 text-xl text-gray-900 outline-none transition invalid:text-gray-400 focus:text-gray-900"
  >
    <option
      value=""
      disabled
      hidden
    >
      {{ placeholder }}
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
