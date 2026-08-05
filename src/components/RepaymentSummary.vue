<script setup>
const props = defineProps({
  repayment: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  frequencyLabel: {
    type: String,
    required: true,
  },
})

const numberFormatter = new Intl.NumberFormat('en-AU')

function formatCurrency (value) {
  return `$${numberFormatter.format(value)}`
}
</script>

<template>
  <section aria-label="Repayment estimate">
    <div>
      <p>
        {{ formatCurrency(props.repayment) }}
      </p>
      <p>
        {{ props.frequencyLabel }} repayments
      </p>
    </div>

    <div>
      <p>
        {{ formatCurrency(props.total) }}
      </p>
      <p>
        Total repayments
      </p>
    </div>
  </section>
</template>
