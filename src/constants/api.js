const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

const API_ENDPOINTS = {
  PERIOD: '/requested-repayment-periods',
  PURPOSE: '/loan-purposes',
  TERM: '/requested-term-months',
}

export {
  API_BASE_URL,
  API_ENDPOINTS,
}
