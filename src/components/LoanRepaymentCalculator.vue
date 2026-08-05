<script setup>
import { fetchLoanOptions } from '@/services/loanOptions'
import calculateRepayments from '@/utils/calculateRepayments'
import { validateLoanAmount } from '@/utils/validateLoanAmount'
import RepaymentSummary from '@/components/RepaymentSummary.vue'
import { computed, onMounted, reactive, ref } from 'vue'

const loanOptions = ref({
  loanPurposes: [],
  repaymentPeriods: [],
  loanTerms: [],
})

const loadState = ref('loading')

const form = reactive({
  loanAmount: '',
  loanPurpose: null,
  repaymentPeriod: null,
  termMonths: null,
})

const loanAmountTouched = ref(false)

const loanAmountValidation = computed(() =>
  validateLoanAmount(form.loanAmount)
)

const selectedPurpose = computed(() =>
  loanOptions.value.loanPurposes.find(
    purpose => purpose.value === form.loanPurpose
  ) ?? null
)

const selectedRepaymentPeriod = computed(() =>
  loanOptions.value.repaymentPeriods.find(
    period => period.value === form.repaymentPeriod
  ) ?? null
)

const isFormComplete = computed(() =>
  loanAmountValidation.value.isValid &&
  selectedPurpose.value !== null &&
  selectedRepaymentPeriod.value !== null &&
  form.termMonths !== null
)

const repaymentResult = computed(() => {
  if (!isFormComplete.value) {
    return null
  }

  return calculateRepayments({
    amount: Number(form.loanAmount),
    annualRate: selectedPurpose.value.annualRate,
    periodsPerYear: selectedRepaymentPeriod.value.value,
    termMonths: form.termMonths,
  })
})

const loanAmountError = computed(() =>
  loanAmountTouched.value
    ? loanAmountValidation.value.error
    : ''
)

function handleLoanAmountInput (event) {
  const digits = event.target.value.replace(/\D/g, '')

  event.target.value = digits
  form.loanAmount = digits
}

async function loadLoanOptions () {
  loadState.value = 'loading'

  try {
    loanOptions.value = await fetchLoanOptions()
    loadState.value = 'ready'
  } catch {
    loadState.value = 'error'
  }
}

onMounted(loadLoanOptions)
</script>

<template>
  <section>
    <p
      v-if="loadState === 'loading'"
      role="status"
    >
      Loading calculator...
    </p>

    <div v-else-if="loadState === 'error'">
      <p role="alert">
        We couldn't load the calculator options.
      </p>

      <button
        type="button"
        @click="loadLoanOptions"
      >
        Try again
      </button>
    </div>

    <div v-else-if="loadState === 'ready'">
      <label for="loan-amount">
        Loan amount
      </label>

      <div>
        <span aria-hidden="true">$</span>

        <input
          id="loan-amount"
          type="text"
          inputmode="numeric"
          :value="form.loanAmount"
          :aria-invalid="Boolean(loanAmountError)"
          :aria-describedby="loanAmountError ? 'loan-amount-error' : undefined"
          @input="handleLoanAmountInput"
          @blur="loanAmountTouched = true"
        >
      </div>

      <p
        v-if="loanAmountError"
        id="loan-amount-error"
      >
        {{ loanAmountError }}
      </p>

      <label for="loan-purpose">
        Loan purpose
      </label>

      <select
        id="loan-purpose"
        v-model="form.loanPurpose"
      >
        <option
          :value="null"
          disabled
        >
          Select a purpose
        </option>

        <option
          v-for="purpose in loanOptions.loanPurposes"
          :key="purpose.value"
          :value="purpose.value"
        >
          {{ purpose.label }}
        </option>
      </select>

      <label for="repayment-period">
        Repayment frequency
      </label>

      <select
        id="repayment-period"
        v-model="form.repaymentPeriod"
      >
        <option
          :value="null"
          disabled
        >
          Select a repayment frequency
        </option>

        <option
          v-for="period in loanOptions.repaymentPeriods"
          :key="period.value"
          :value="period.value"
        >
          {{ period.label }}
        </option>
      </select>

      <label for="loan-term">
        Loan term
      </label>

      <select
        id="loan-term"
        v-model="form.termMonths"
      >
        <option
          :value="null"
          disabled
        >
          Select a term
        </option>

        <option
          v-for="term in loanOptions.loanTerms"
          :key="term.value"
          :value="term.value"
        >
          {{ term.label }}
        </option>
      </select>

      <RepaymentSummary
        v-if="repaymentResult"
        :repayment="repaymentResult.repaymentPerPeriod"
        :total="repaymentResult.totalRepayments"
        :frequency-label="selectedRepaymentPeriod.label"
      />
    </div>
  </section>
</template>
