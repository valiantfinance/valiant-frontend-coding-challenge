<script setup>
import { useLoanCalculatorStore } from '@/stores/loanCalculatorStore'

defineOptions({
  name: 'App',
})

const loanCalculatorStore = useLoanCalculatorStore()
</script>

<template>
  <div>
    <p>Loan Amount: {{ loanCalculatorStore.loanAmount }}</p>
    <p>Interest Rate: {{ loanCalculatorStore.interestRate }}</p>
  </div>
</template>
