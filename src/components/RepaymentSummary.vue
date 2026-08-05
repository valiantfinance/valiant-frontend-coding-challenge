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
  <section
    aria-label="Repayment estimate"
    class="mt-8 border-t border-slate-200 pt-6"
  >
    <div
      class="grid gap-5 rounded-xl border border-yellow-200 bg-yellow-50 p-5 sm:grid-cols-2 sm:gap-0 sm:p-6"
    >
      <div class="sm:pr-6">
        <p
          class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
        >
          {{ formatCurrency(props.repayment) }}
        </p>

        <p class="mt-1 text-sm font-medium text-slate-600">
          {{ props.frequencyLabel }} repayments
        </p>
      </div>

      <div
        class="border-t border-yellow-200 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
      >
        <p
          class="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
        >
          {{ formatCurrency(props.total) }}
        </p>

        <p class="mt-1 text-sm font-medium text-slate-600">
          Total repayments
        </p>
      </div>
    </div>
  </section>
</template>
