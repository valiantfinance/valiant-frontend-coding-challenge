const MIN_LOAN_AMOUNT = 1000
const MAX_LOAN_AMOUNT = 20000000

function validateLoanAmount (value) {
  if (value === '') {
    return {
      isValid: false,
      error: '',
    }
  }

  if (!/^\d+$/.test(value)) {
    return {
      isValid: false,
      error: 'Enter digits only.',
    }
  }

  const amount = Number(value)

  if (amount < MIN_LOAN_AMOUNT) {
    return {
      isValid: false,
      error: 'Enter an amount of at least $1,000.',
    }
  }

  if (amount > MAX_LOAN_AMOUNT) {
    return {
      isValid: false,
      error: 'Enter an amount up to $20,000,000.',
    }
  }

  return {
    isValid: true,
    error: '',
  }
}

export {
  validateLoanAmount,
}
