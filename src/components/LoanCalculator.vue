<script setup>
import { onMounted, toRef } from 'vue'

import LoanAmountInput from '@/components/LoanAmountInput.vue'
import LoanFormErrors from '@/components/LoanFormErrors.vue'
import LoanOptionsStatus from '@/components/LoanOptionsStatus.vue'
import LoanSelect from '@/components/LoanSelect.vue'
import { useCurrencyInput } from '@/composables/useCurrencyInput'
import { useLoanOptions } from '@/composables/useLoanOptions'
import { useLoanStore } from '@/stores/loanStore'

const loanStore = useLoanStore()
const { amountInput } = useCurrencyInput(toRef(loanStore, 'amount'))
const { loanOptions, isLoading, error, loadLoanOptions } = useLoanOptions()

onMounted(() => {
  loadLoanOptions()
})
</script>

<template>
  <LoanOptionsStatus
    :error="error"
    :is-loading="isLoading"
  />

  <form
    v-if="!error"
    novalidate
    @submit.prevent
  >
    <LoanFormErrors
      :errors="loanStore.form.errors"
      :touched="loanStore.form.touched"
    />

    <fieldset>
      <legend>Loan calculator</legend>

      <span>I need</span>
      <label
        for="loan-amount"
        class="sr-only"
      >
        Loan amount
      </label>
      <LoanAmountInput
        id="loan-amount"
        v-model="amountInput"
        name="amount"
        required
        aria-describedby="amount-error"
        :aria-invalid="Boolean(loanStore.form.touched.amount && loanStore.form.errors.amount)"
        @blur="loanStore.touch('amount')"
      />

      <span>for</span>
      <label
        for="loan-purpose"
        class="sr-only"
      >
        Loan purpose
      </label>
      <LoanSelect
        id="loan-purpose"
        v-model="loanStore.purpose"
        name="purpose"
        required
        :options="loanOptions.purpose"
        :disabled="isLoading"
        aria-describedby="purpose-error"
        :aria-invalid="Boolean(loanStore.form.touched.purpose && loanStore.form.errors.purpose)"
        @blur="loanStore.touch('purpose')"
      />

      <span>repaid</span>
      <label
        for="loan-period"
        class="sr-only"
      >
        Repayment period
      </label>
      <LoanSelect
        id="loan-period"
        v-model="loanStore.period"
        name="period"
        required
        :options="loanOptions.period"
        :disabled="isLoading"
        aria-describedby="period-error"
        :aria-invalid="Boolean(loanStore.form.touched.period && loanStore.form.errors.period)"
        @blur="loanStore.touch('period')"
      />

      <span>over</span>
      <label
        for="loan-term"
        class="sr-only"
      >
        Loan term
      </label>
      <LoanSelect
        id="loan-term"
        v-model="loanStore.term"
        name="term"
        required
        :options="loanOptions.term"
        :disabled="isLoading"
        aria-describedby="term-error"
        :aria-invalid="Boolean(loanStore.form.touched.term && loanStore.form.errors.term)"
        @blur="loanStore.touch('term')"
      />
    </fieldset>
  </form>
</template>
