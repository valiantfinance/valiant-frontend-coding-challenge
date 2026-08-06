const API_BASE_URL = 'http://localhost:5000'

async function fetchJson (path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(
      `Request to ${path} failed with status ${response.status}`
    )
  }

  return response.json()
}

async function fetchLoanOptions () {
  const [
    loanPurposes,
    repaymentPeriods,
    loanTerms,
  ] = await Promise.all([
    fetchJson('/loan-purposes'),
    fetchJson('/requested-repayment-periods'),
    fetchJson('/requested-term-months'),
  ])

  return {
    loanPurposes,
    repaymentPeriods,
    loanTerms,
  }
}

export {
  fetchLoanOptions,
}
