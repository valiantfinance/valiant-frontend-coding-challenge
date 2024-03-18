<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-2">
      <slot name="label" />
      <slot name="default" />
    </div>
    <div
      v-if="error"
      class="text-xs text-red-500"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: '',
  },
})
</script>
