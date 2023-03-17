<!-- @format -->

<template>
  <div>
    <label
      :for="id"
      class="selectComponent--label"
    >
      <span class="selectComponent--label--text">{{ label }}</span>{{ ' ' }}
      <select
        :id="id"
        v-model="selectedItem"
        @change="handleChange"
      >
        <option
          value=""
          disabled
          selected
        >
          {{ placeholderText }}
        </option>
        <option
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          {{ item.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    placeholderText: {
      type: String,
      default: 'Select your option',
    },
  },
  data () {
    return {
      selectedItem: null,
    }
  },
  methods: {
    handleChange () {
      this.$emit('selected', { selectedItemIndex: this.selectedItem, selectedItemId: this.id })
    },
  },
}
</script>

<style lang="scss" scoped>
$fontSize: 2rem;

.selectComponent--label{
  display: flex;
  font-size: $fontSize;
}

.selectComponent--label--text{
  margin-right: 1rem;
}
</style>
