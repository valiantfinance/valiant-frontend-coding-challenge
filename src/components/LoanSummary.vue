<script setup>
import { useLoanStore } from '@/stores/loanStore'
import { formatCurrency } from '@/utils/currency'

const loanStore = useLoanStore()
</script>

<template>
  <section
    aria-atomic="true"
    aria-live="polite"
  >
    <dl v-if="loanStore.summary">
      <div>
        <dt>Monthly repayments</dt>
        <dd>{{ formatCurrency(loanStore.summary.monthlyRepayments) }}</dd>
      </div>
      <div>
        <dt>Total repayments</dt>
        <dd>{{ formatCurrency(loanStore.summary.totalRepayments) }}</dd>
      </div>
    </dl>
    <p v-else>
      Enter your loan details above to see your repayment summary.
    </p>
  </section>
</template>
