<template>
  <input
    v-model="model"
    type="number"
    class="w-full rounded border border-gray-300 p-2"
    placeholder="Enter amount"
    :min="min"
    :max="max"
  >
</template>

<script setup>
defineProps({
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
})

const model = defineModel()
</script>
