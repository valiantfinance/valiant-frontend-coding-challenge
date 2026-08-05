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
  <section
    class="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12"
  >
    <div class="mb-8">
      <h1
        class="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
      >
        Loan repayment calculator
      </h1>

      <p
        class="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base"
      >
        Estimate your business loan repayments.
      </p>
    </div>

    <p
      v-if="loadState === 'loading'"
      role="status"
      class="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm"
    >
      Loading calculator...
    </p>

    <div
      v-else-if="loadState === 'error'"
      class="rounded-xl border border-red-200 bg-red-50 p-5"
    >
      <p
        role="alert"
        class="text-sm font-medium text-red-800"
      >
        We couldn't load the calculator options.
      </p>

      <button
        type="button"
        class="mt-4 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-800 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        @click="loadLoanOptions"
      >
        Try again
      </button>
    </div>

    <div
      v-else-if="loadState === 'ready'"
      class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div
        class="flex flex-wrap items-center gap-x-3 gap-y-4 text-lg text-slate-800 sm:text-xl"
      >
        <span>I need</span>

        <label
          for="loan-amount"
          class="sr-only"
        >
          Loan amount
        </label>

        <div class="relative">
          <span
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500"
          >
            $
          </span>

          <input
            id="loan-amount"
            type="text"
            inputmode="numeric"
            :value="form.loanAmount"
            :aria-invalid="Boolean(loanAmountError)"
            :aria-describedby="loanAmountError ? 'loan-amount-error' : undefined"
            class="w-40 max-w-full rounded-lg border bg-white py-2.5 pl-7 pr-3 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-2"
            :class="loanAmountError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-300 focus:border-slate-950 focus:ring-yellow-300'"
            placeholder="30,000"
            @input="handleLoanAmountInput"
            @blur="loanAmountTouched = true"
          >
        </div>

        <span>for</span>

        <label
          for="loan-purpose"
          class="sr-only"
        >
          Loan purpose
        </label>

        <select
          id="loan-purpose"
          v-model="form.loanPurpose"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-medium text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-yellow-300 sm:w-auto sm:min-w-56"
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
      </div>

      <p
        v-if="loanAmountError"
        id="loan-amount-error"
        class="mt-2 text-sm font-medium text-red-700"
      >
        {{ loanAmountError }}
      </p>

      <div
        class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-4 text-lg text-slate-800 sm:text-xl"
      >
        <span>repaid</span>

        <label
          for="repayment-period"
          class="sr-only"
        >
          Repayment frequency
        </label>

        <select
          id="repayment-period"
          v-model="form.repaymentPeriod"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-medium text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-yellow-300 sm:w-auto"
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

        <span>over</span>

        <label
          for="loan-term"
          class="sr-only"
        >
          Loan term
        </label>

        <select
          id="loan-term"
          v-model="form.termMonths"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base font-medium text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-yellow-300 sm:w-auto"
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
      </div>

      <RepaymentSummary
        v-if="repaymentResult"
        :repayment="repaymentResult.repaymentPerPeriod"
        :total="repaymentResult.totalRepayments"
        :frequency-label="selectedRepaymentPeriod.label"
      />
    </div>
  </section>
</template>
