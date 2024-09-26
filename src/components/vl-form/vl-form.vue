<script setup>
import vlInput from '../vl-input/vl-input.vue'
import vlSelect from '../vl-select/vl-select.vue'
import { ref, computed } from 'vue'
import PMT from '../../utils/PMT.js'
import lang from '../lang/v-form.lang.json'

/* Define reference for form fields model values */
const form = {
  loanPurpose: ref(0),
  repaymentPeriods: ref(0),
  loanTerm: ref(0),
  loanAmount: ref(''),
}

/* Define object to store custom validation errors */
const objFieldsErrors = ref(null)

/* For input min and max value validation error */
const isInputValid = ref(false)

const getPMTMonthly = ref(null)
const getPMTTotal = ref(null)

const isLoanAmountValid = computed(() => form.loanAmount.value?.trim() !== '')
const isRepaymentPeriodsValid = computed(() => form.repaymentPeriods.value !== 0)
const isLoanTermValid = computed(() => form.loanTerm.value !== 0)
const isLoanPurposeValid = computed(() => form.loanPurpose.value !== 0)

/* Error validation on form submission and display the errors */
const formValidation = () => {
  objFieldsErrors.value = {}
  if (!isLoanAmountValid.value) {
    objFieldsErrors.value.isLoanAmountValid = `${lang.vForm.validationMessage.loanAmountValidationMessage}`
  }
  if (!isRepaymentPeriodsValid.value) {
    objFieldsErrors.value.isRepaymentPeriodsValid = `${lang.vForm.validationMessage.repaymentPeriodsValidationMessage}`
  }
  if (!isLoanTermValid.value) {
    objFieldsErrors.value.isLoanTermValid = `${lang.vForm.validationMessage.loanTermValidationMessage}`
  }
  if (!isLoanPurposeValid.value) {
    objFieldsErrors.value.isLoanPurposeValid = `${lang.vForm.validationMessage.loanPurposeValidationMessage}`
  }
}

/* Calculate monthly and total repayments */
const calculatePMT = () => {
  // PMT(rate(Loan purpose/requested-repayment-periods): any, nper(Loan term input): any, pv(Requested loan amount): any, fv?: number, type?: number): number
  const loanPurpose = form.loanPurpose.value
  const requestedRepaymentPeriods = form.repaymentPeriods.value
  const loanTermInput = form.loanTerm.value
  const loanAmount = form.loanAmount.value
  if (loanPurpose && requestedRepaymentPeriods && loanTermInput && loanAmount) {
    // convert negative value to absolute number value and rounded integer
    const number = Math.abs(PMT(loanPurpose / requestedRepaymentPeriods, loanTermInput, loanAmount))
    getPMTMonthly.value = Math.round(number)
    getPMTTotal.value = getPMTMonthly.value * loanTermInput
  } else {
    getPMTMonthly.value = null
  }
}

/* Form submission */
const onSubmit = () => {
  formValidation()
  calculatePMT()
}

/* Check for has error function emit on input validation */
const hasInputError = (error) => {
  isInputValid.value = error
}

</script>

<template>
  <div class="md:flex">
    <div class="p-8">
      <form @submit.prevent="onSubmit">
        <div class="space-y-8 px-5 py-8">
          <div class="border-b border-gray-900/10 pb-8">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              {{ lang.vForm.pageTitle }}
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              {{ lang.vForm.pageInfo }}
            </p>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <vlInput
              v-model="form.loanAmount.value"
              :label="lang.vlLoanAmountLabel"
              name="loan-amount"
              :min="1000"
              :max="20000000"
              :is-valid="isLoanAmountValid"
              :errors-text="objFieldsErrors?.isLoanAmountValid"
              @has-error="hasInputError"
            />

            <vlSelect
              v-model="form.loanPurpose.value"
              :label="lang.vlLoanPurposeLabel"
              :is-valid="isLoanPurposeValid"
              :errors-text="objFieldsErrors?.isLoanPurposeValid"
              url="/loan-purposes"
              name="loan-purposes"
            />

            <vlSelect
              v-model="form.repaymentPeriods.value"
              :label="lang.vlRepaymentPeriods"
              :is-valid="isRepaymentPeriodsValid"
              :errors-text="objFieldsErrors?.isRepaymentPeriodsValid"
              url="/requested-repayment-periods"
              name="repayment-periods"
            />

            <vlSelect
              v-model="form.loanTerm.value"
              :label="lang.vlLoanTermLabel"
              :is-valid="isLoanTermValid"
              :errors-text="objFieldsErrors?.isLoanTermValid"
              url="/requested-term-months"
              name="loan-term"
            />
          </div>
          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              :disabled="isInputValid"
              type="submit"
              :class="{ 'cursor-not-allowed opacity-50' : isInputValid }"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ lang.vForm.buttonText }}
            </button>
          </div>
          <div
            v-if="getPMTMonthly && getPMTTotal"
            role="success"
          >
            <div class="rounded-t bg-green-500 px-4 py-2 text-white">
              {{ lang.vForm.repayments }}
            </div>
            <div class="rounded-b border border-t-0 border-green-400 bg-green-100 px-4 py-3 text-green-700">
              <p class="text-sm">
                {{ lang.vForm.monthlyRepayment + getPMTMonthly }}
              </p>
              <p class="text-sm">
                {{ lang.vForm.totalRepayment + getPMTTotal }}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
</style>
