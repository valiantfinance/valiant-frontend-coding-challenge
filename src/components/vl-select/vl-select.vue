<script setup>
import { ref, onMounted } from 'vue'
import fetchAPI from '../../utils/API.js'

const props = defineProps({
  /**
   * label for the dropdown
   */
  label: {
    type: String,
    default: '',
    Required: false,
  },
  /**
   * Url for the API call
   */
  url: {
    type: String,
    default: '',
    Required: true,
  },
  /**
   * Define name for dropdown
   */
  name: {
    type: String,
    default: 'select',
    Required: true,
  },
  /**
   * Validation error message
   */
  errorsText: {
    type: String,
    default: '',
    Required: false,
  },
  /**
   * Whether the field value is valid or not
   */
  isValid: {
    type: Boolean,
    Required: false,
  },
})

defineEmits(['change'])

const modelValue = defineModel('modelValue', { type: Number, default: 0 })

/* Start section */
const getData = ref(null)

async function fetchData () {
  try {
    getData.value = await fetchAPI(props.url)
  } catch (err) {
    if (err instanceof Error) {
      // Perform your error handling here
    }
  }
}

/* on mount life cycle hook */
onMounted(() => {
  fetchData()
})

/* End */

</script>

<template>
  <div class="sm:col-span-3">
    <label
      :for="name"
      class="vl-required block text-sm font-medium leading-6 text-gray-900"
    >{{ label }}</label>
    <div class="mt-2">
      <select
        v-model="modelValue"
        :name="name"
        class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        @change="$emit('change')"
      >
        <option
          v-for="(item, i) in getData"
          :key="i"
          :value="item.annualRate ? item.annualRate : item.value ? item.value : null"
        >
          {{ item.label }}<option />
        </option>
      </select>
      <div
        class="h-6 rounded-lg text-sm text-red-700 dark:text-red-700"
        role="alert"
      >
        <span v-if="errorsText && errorsText !== '' && !isValid">
          {{ errorsText }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
</style>
