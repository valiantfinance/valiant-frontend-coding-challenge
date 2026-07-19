<script setup>
import LoanCalculator from '@/components/LoanCalculator.vue'
import LoanSummary from '@/components/LoanSummary.vue'

defineOptions({
  name: 'ValiantLoanCalculator',
})
</script>

<template>
  <main>
    <h1>Loan Repayment Calculator</h1>
    <LoanCalculator />
    <LoanSummary />
  </main>
</template>
