<script setup>
import { computed } from 'vue'
import { useLoanStore } from '@/stores/loanStore'
import { formatCurrency } from '@/utils/currency'
import { LOAN_REPAYMENT_FREQUENCY } from '../constants/loan'

const loanStore = useLoanStore()

const frequency = computed(() => {
  return LOAN_REPAYMENT_FREQUENCY[loanStore.period] ?? ''
})
</script>

<template>
  <section
    class="mx-auto bg-[var(--color-primary-light)] p-8 lg:w-1/3"
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
        <p class="mb-2">
          Estimated {{ frequency }} repayments
        </p>
        <p
          class="mb-4 font-[family-name:var(--font-serif)] text-5xl font-normal tracking-[0.1px]"
        >
          {{ formatCurrency(loanStore.summary?.repayments) }}
        </p>
      </div>
      <dl class="flex justify-between">
        <dt>
          Total repayments
        </dt>
        <dd class="font-[family-name:var(--font-serif)] font-normal tracking-[0.1px]">
          {{ formatCurrency(loanStore.summary?.total) }}
        </dd>
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
