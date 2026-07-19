<script setup>
defineOptions({ inheritAttrs: false })

const modelValue = defineModel({
  type: [String, Number],
  default: '',
})

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select option',
  },
  prefix: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="flex items-center">
    <span
      v-if="props.prefix"
      class="mr-2"
    >{{ props.prefix }}</span>
    <label
      v-if="props.label"
      :for="$attrs.id"
      class="sr-only"
    >{{ props.label }}</label>
    <select
      v-model="modelValue"
      v-bind="$attrs"
      required
      class="min-w-52 appearance-none border-b border-dashed border-gray-900 bg-transparent px-1 text-xl text-gray-900 outline-none transition invalid:text-gray-400 focus:text-gray-900"
    >
      <option
        value=""
        disabled
        hidden
      >
        {{ props.placeholder }}
      </option>
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.annualRate ?? option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
