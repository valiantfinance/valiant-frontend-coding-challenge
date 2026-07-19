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
  <div
    v-if="activeErrors.length"
    role="alert"
  >
    <p id="formErrorsHeading">
      Please fix the following {{ activeErrors.length === 1 ? 'error' : `${activeErrors.length} errors` }}:
    </p>
    <ul aria-labelledby="formErrorsHeading">
      <li
        v-for="{ field, message } in activeErrors"
        :id="`${field}Error`"
        :key="field"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>
