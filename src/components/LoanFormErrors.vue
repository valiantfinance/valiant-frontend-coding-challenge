<script setup>
import { computed } from 'vue'

const props = defineProps({
  errors: {
    type: Object,
    default: () => ({}),
  },
  touched: {
    type: Object,
    default: () => ({}),
  },
})

/**
 * Returns validation errors that should be displayed to the user.
 *
 * Only includes errors for fields the user has interacted with,
 * preventing validation messages from appearing before user input.
 */
const activeErrors = computed(() =>
  Object.entries(props.errors)
    .filter(([field, message]) => isVisibleError(field, message))
    .map(([field, message]) => ({
      field,
      message,
    }))
)

/**
 * Determines whether a validation error should be visible.
 *
 * An error is displayed only after the user has interacted with
 * the field and a validation message exists.
 *
 * @param {string} field - The field name being validated.
 * @param {string|null} message - The validation message for the field.
 * @returns {boolean} Whether the error should be displayed.
 */
const isVisibleError = (field, message) =>
  props.touched[field] && Boolean(message)
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
      v-if="activeErrors.length"
      role="alert"
      class="fixed left-0 top-0 z-10 flex w-full flex-col items-center justify-center bg-red-50 px-4 py-3 text-center text-xs text-red-700"
    >
      <p id="formErrorsHeading">
        Please fix the following {{ activeErrors.length === 1 ? 'error' : `${activeErrors.length} errors` }}:
      </p>
      <ul aria-labelledby="formErrorsHeading">
        <li
          v-for="{ field, message } in activeErrors"
          :id="`${field}Error`"
          :key="field"
          class="my-1"
        >
          {{ message }}
        </li>
      </ul>
    </div>
  </Transition>
</template>
