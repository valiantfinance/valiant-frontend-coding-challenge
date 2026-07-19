import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

import { LOAN_LIMITS } from '@/constants/loan.js'
import { validateLoanAmount, validateRequiredSelection } from '@/validation/loanValidator'
import { calculateLoanSummary } from '@/utils/loanCalculator'

export const useLoanStore = defineStore('loanStore', () => {
  const amount = ref(null)
  const period = ref('')
  const purpose = ref('')
  const term = ref('')

  /**
   * Tracks user interaction with form fields so validation messages
   * are only displayed after the user has interacted with a field.
   */
  const touched = reactive({
    amount: false,
    purpose: false,
    period: false,
    term: false,
  })

  /**
   * Marks a form field as touched after user interaction.
   *
   * @param {string} field - The field name to mark as touched.
   */
  const touch = (field) => {
    if (field in touched) {
      touched[field] = true
    }
  }

  /**
   * Marks all form fields as touched.
   *
   * Used when displaying the complete validation state,
   * such as after attempting to submit the form.
   */
  const touchAll = () => {
    Object.keys(touched).forEach((field) => {
      touched[field] = true
    })
  }

  /**
   * Derived validation state for each loan form field.
   *
   * Returns a validation message for invalid fields,
   * or null when the field is valid.
   */
  const errors = computed(() => ({
    amount: validateLoanAmount(
      amount.value,
      LOAN_LIMITS.AMOUNT.MIN,
      LOAN_LIMITS.AMOUNT.MAX
    ),
    purpose: validateRequiredSelection(
      purpose.value,
      'Loan purpose'
    ),
    period: validateRequiredSelection(
      period.value,
      'Repayment period'
    ),
    term: validateRequiredSelection(
      term.value,
      'Loan term'
    ),
  }))

  /**
   * Determines whether the loan form has any validation errors.
   *
   * @returns {boolean} True when all validation errors have been resolved.
   */
  const isValid = computed(() =>
    !Object.values(errors.value)
      .some(Boolean)
  )

  /**
   * Calculates the loan repayment summary when all required inputs are valid.
   *
   * Prevents the calculation from running against incomplete or invalid form
   * state by returning null until validation has passed.
   *
   * @returns {Object|null} The calculated loan summary, or null when inputs are invalid.
   */
  const summary = computed(() => {
    if (!isValid.value) {
      return null
    }

    return calculateLoanSummary({
      amount: amount.value,
      period: period.value,
      purpose: purpose.value,
      term: term.value,
    })
  })

  return {
    amount,
    period,
    purpose,
    term,

    form: {
      touched,
      errors,
      isValid,
    },

    summary,

    touch,
    touchAll,
  }
})
