<script setup>
import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanStore'
import { formatCurrency } from '@/utils/currency'
import { LOAN_REPAYMENT_FREQUENCY } from '../constants/loan'

const loanStore = useLoanStore()

const frequency = computed(() => {
  return LOAN_REPAYMENT_FREQUENCY[loanStore.period] ?? ''
})

const summaryItems = computed(() => [
  {
    label: 'Loan amount',
    value: formatCurrency(loanStore.amount),
  },
  {
    label: 'Frequency',
    value: frequency.value,
  },
  {
    label: 'Total repayments',
    value: formatCurrency(loanStore.summary.total),
  },
])
</script>

<template>
  <section
    class="mx-auto bg-[var(--color-primary-light)] p-4 md:p-8 lg:w-1/3"
    aria-labelledby="repayment-summary-heading"
  >
    <h2
      id="repayment-summary-heading"
      class="sr-only"
    >
      Loan repayment summary
    </h2>
    <div v-if="loanStore.summary">
      <div
        role="status"
        aria-live="polite"
      >
        <p class="mb-5 flex gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#454545"
            viewBox="0 0 24 24"
          ><path d="M21 2v20h-18v-20h18zm2-2h-22v24h22v-24zm-3 3h-16v5h16v-5zm-13 7h-3v3h3v-3zm4 0h-3v3h3v-3zm4 0h-3v3h3v-3zm5 0h-3v3h3v-3zm-13 4h-3v3h3v-3zm4 0h-3v3h3v-3zm4 0h-3v3h3v-3zm5 0h-3v7h3v-7zm-13 4h-3v3h3v-3zm4 0h-3v3h3v-3zm4 0h-3v3h3v-3z" /></svg>
          {{ frequency }} repayments
        </p>
        <p class="mb-4 font-[family-name:var(--font-serif)] text-5xl font-normal tracking-[0.1px]">
          {{ formatCurrency(loanStore.summary?.repayments) }}
        </p>
      </div>
      <dl class="mt-10 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <template
          v-for="item in summaryItems"
          :key="item.label"
        >
          <dt>{{ item.label }}</dt>
          <dd class="text-right font-bold">
            {{ item.value }}
          </dd>
        </template>
      </dl>
    </div>
    <div v-else>
      <h3 class="mb-4 text-xl">
        Let's get started
      </h3>
      <p>
        Choose your loan amount, purpose, repayment frequency, and term to see
        your estimated repayments.
      </p>
    </div>
  </section>
</template>
