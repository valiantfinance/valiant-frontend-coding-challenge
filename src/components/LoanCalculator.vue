<script setup>
import { onMounted, toRef } from 'vue'

import LoanAmountInput from '@/components/LoanAmountInput.vue'
import LoanFormErrors from '@/components/LoanFormErrors.vue'
import LoanOptionsStatus from '@/components/LoanOptionsStatus.vue'
import LoanSelect from '@/components/LoanSelect.vue'
import LoanSummary from '@/components/LoanSummary.vue'
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
  <LoanFormErrors
    :errors="loanStore.form.errors"
    :touched="loanStore.form.touched"
  />
  <section class="mx-auto mt-auto max-w-[1240px] rounded-xl bg-white p-8 lg:flex lg:gap-12 lg:p-16">
    <div class="md:w-2/3">
      <h2 class="mb-8 max-w-xl text-3xl leading-tight lg:text-5xl">
        Estimate your repayments in <em>seconds</em>
      </h2>
      <p class="my-3 lg:max-w-xl">
        Enter your loan details to see how much you could repay each period and the total amount payable over the life of your loan.
      </p>
      <form
        v-if="!error"
        class="my-12 flex flex-wrap items-center"
        novalidate
        @submit.prevent
      >
        <fieldset class="flex flex-wrap items-center gap-2 text-xl leading-8">
          <legend class="sr-only">
            Loan calculator
          </legend>
          <LoanAmountInput
            id="loan-amount"
            v-model="amountInput"
            name="amount"
            required
            placeholder="$ amount"
            aria-describedby="amount-error"
            :aria-invalid="Boolean(loanStore.form.touched.amount && loanStore.form.errors.amount)"
            prefix="I need"
            label="Loan amount"
            @blur="loanStore.touch('amount')"
          />
          <LoanSelect
            id="loan-purpose"
            v-model="loanStore.purpose"
            name="purpose"
            required
            placeholder="what's it for"
            :options="loanOptions.purpose"
            :disabled="isLoading"
            aria-describedby="purpose-error"
            :aria-invalid="Boolean(loanStore.form.touched.purpose && loanStore.form.errors.purpose)"
            prefix="for"
            label="Loan purpose"
            @blur="loanStore.touch('purpose')"
          />
          <LoanSelect
            id="loan-period"
            v-model="loanStore.period"
            name="period"
            required
            placeholder="how often"
            :options="loanOptions.period"
            :disabled="isLoading"
            aria-describedby="period-error"
            :aria-invalid="Boolean(loanStore.form.touched.period && loanStore.form.errors.period)"
            prefix="repaid"
            label="Repayment period"
            @blur="loanStore.touch('period')"
          />
          <LoanSelect
            id="loan-term"
            v-model="loanStore.term"
            name="term"
            required
            placeholder="how long"
            :options="loanOptions.term"
            :disabled="isLoading"
            aria-describedby="term-error"
            :aria-invalid="Boolean(loanStore.form.touched.term && loanStore.form.errors.term)"
            prefix="over"
            label="Loan term"
            @blur="loanStore.touch('term')"
          />
        </fieldset>
      </form>
    </div>
    <LoanSummary />
  </section>
</template>
