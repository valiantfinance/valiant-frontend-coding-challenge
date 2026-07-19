import { formatCurrency } from '@/utils/currency'

/**
 * Validates a loan amount against required, type, and range constraints.
 *
 * Returns an error message describing the validation failure, or null when
 * the loan amount is valid.
 *
 * @param {number|null} amount - The loan amount to validate.
 * @param {number} min - The minimum allowed loan amount.
 * @param {number} max - The maximum allowed loan amount.
 *
 * @returns {string|null} Validation error message or null when valid.
 */
const validateLoanAmount = (amount, min, max) => {
  if (amount === null || amount === undefined || amount === '') {
    return 'Loan amount is required'
  }

  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    return 'Enter a valid loan amount'
  }

  if (amount <= 0) {
    return 'Loan amount must be greater than zero'
  }

  if (amount < min) {
    return `Minimum loan amount is ${formatCurrency(min)}`
  }

  if (amount > max) {
    return `Maximum loan amount is ${formatCurrency(max)}`
  }

  return null
}

/**
 * Validates that a required field has a value.
 *
 * Returns a formatted error message when the value is empty, otherwise returns
 * null when validation succeeds.
 *
 * @param {unknown} value - The field value to validate.
 * @param {string} label - The human-readable field name used in the error message.
 *
 * @returns {string|null} Validation error message or null when valid.
 *
 * @example
 * validateRequiredSelection('', 'Loan term')
 * // "Loan term is required"
 */
const validateRequiredSelection = (value, label) => {
  if (value === null || value === undefined || value === '') {
    return `${label} is required`
  }

  return null
}

export {
  validateLoanAmount,
  validateRequiredSelection,
}
