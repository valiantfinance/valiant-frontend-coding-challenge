<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  size: String,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const typeClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
  }

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-lg py-3 px-6',
  }

  return [
    'transition ease-in-out duration-150 font-semibold rounded-lg focus:outline-none focus:shadow-outline',
    typeClasses[props.type] || 'bg-blue-500 hover:bg-blue-700 text-white',
    sizeClasses[props.size] || 'text-sm py-2 px-4',
    props.disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ')
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
