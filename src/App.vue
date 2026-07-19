<script setup>
import LoanCalculator from '@/components/LoanCalculator.vue'

defineOptions({
  name: 'ValiantLoanCalculator',
})
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
    <LoanCalculator />
    <footer class="mt-auto">
      <p class=" text-center text-xs text-gray-500">
        This calculator provides an estimate only and does not consitute a loan offer.
      </p>
    </footer>
  </main>
</template>
