import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api'

/**
 * Fetches JSON data from an API endpoint.
 *
 * Handles HTTP errors by throwing when the response is unsuccessful.
 *
 * @param {string} endpoint - API endpoint path.
 * @returns {Promise<Object>} Parsed JSON response data.
 * @throws {Error} When the request fails or returns an unsuccessful response.
 */
const fetchJson = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}

/**
 * Fetches all loan calculator options required by the form.
 *
 * The option lists are independent, so they are requested concurrently
 * to reduce total loading time.
 *
 * @returns {Promise<Object>} Loan purpose, repayment period, and term options.
 * @throws {Error} When any option request fails.
 */
const fetchLoanOptions = async () => {
  const [purpose, period, term] = await Promise.all([
    fetchJson(API_ENDPOINTS.PURPOSE),
    fetchJson(API_ENDPOINTS.PERIOD),
    fetchJson(API_ENDPOINTS.TERM),
  ])

  return {
    purpose,
    period,
    term,
  }
}

export {
  fetchLoanOptions,
}
