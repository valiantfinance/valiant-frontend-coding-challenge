<script setup>
const modelValue = defineModel({
  type: String,
  default: null,
})

defineProps({
  placeholder: {
    type: String,
    default: '$1,000',
  },
})

/**
 * Restricts text input to numeric characters only.
 *
 * Used on the text input to prevent non-numeric characters from being
 * entered while allowing deletion actions. This provides immediate input
 * filtering before the value is emitted to the model.
 *
 * @param {InputEvent} event - The beforeinput event triggered by user input.
 * @returns {void}
 */
const onBeforeInput = (event) => {
  /** Allow delete key on field */
  if (event.inputType.startsWith('delete')) {
    return
  }

  /** Allow only digits */
  if (!/^\d+$/.test(event.data ?? '')) {
    event.preventDefault()
  }
}
</script>

<template>
  <input
    v-model="modelValue"
    class="w-36 border-b border-dashed border-gray-900 bg-transparent px-1 text-xl tracking-[0.32px] text-gray-900 outline-none transition focus:border-solid"
    :placeholder="placeholder"
    type="text"
    inputmode="numeric"
    pattern="[0-9]*"
    autocomplete="off"
    @beforeinput="onBeforeInput"
  >
</template>
