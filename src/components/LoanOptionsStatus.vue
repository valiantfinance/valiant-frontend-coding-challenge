<script setup>
defineProps({
  error: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <p
    v-if="error"
    role="alert"
  >
    {{ error }}
  </p>
  <p
    v-if="isLoading"
    role="status"
  >
    Loading loan options…
  </p>
</template>
