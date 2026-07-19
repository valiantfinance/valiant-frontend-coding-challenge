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
  <Transition
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-400 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div
      v-if="error || isLoading"
      class="fixed left-0 top-0 z-10 flex w-full text-xs"
    >
      <p
        v-if="error"
        role="alert"
        class="flex-1 bg-red-50 px-4 py-3 text-center text-red-700"
      >
        {{ error }}
      </p>
      <p
        v-else-if="isLoading"
        role="status"
        class="flex-1 bg-yellow-50 px-4 py-3 text-center text-yellow-700"
      >
        Loading…
      </p>
    </div>
  </Transition>
</template>
