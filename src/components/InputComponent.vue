<template>
  <input
    type="number"
    :value="formattedValue"
    class="input rounded border border-gray-300 p-2"
    placeholder="Enter amount"
  >
</template>

<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'

// Define props with modelValue for v-model compatibility
const props = defineProps({
  modelValue: Number,
})

// Emit function for updating modelValue
const model = defineModel()

// Computed property for getting formatted value for display
const formattedValue = computed(() => {
  return props.modelValue ? props.modelValue.toLocaleString() : ''
})

</script>
