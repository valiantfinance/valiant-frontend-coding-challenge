import { defineStore } from 'pinia'

export const useLoanCalculatorStore = defineStore('loanCalculator', {
  state: () => ({
    amount: 0,
    interestRate: 0,
  }),
})
