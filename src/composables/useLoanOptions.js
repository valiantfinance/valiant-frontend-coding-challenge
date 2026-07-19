import { ref } from 'vue'

import { fetchLoanOptions } from '@/services/loanApi'

/**
 * Creates the default empty state for loan calculator options.
 *
 * @returns {Object} Empty loan option collections.
 */
const createEmptyLoanOptions = () => ({
  purpose: [],
  period: [],
  term: [],
})

/**
 * Manages loan calculator option data and request state.
 *
 * Handles fetching loan options, loading state, and user-facing
 * error state while keeping API communication inside the service layer.
 *
 * @returns {Object} Reactive loan options state and loading actions.
 */
const useLoanOptions = () => {
  const loanOptions = ref(createEmptyLoanOptions())
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Loads loan calculator options and manages request state.
   *
   * @returns {Promise<void>}
   */
  const loadLoanOptions = async () => {
    isLoading.value = true
    error.value = null

    try {
      loanOptions.value = await fetchLoanOptions()
    } catch {
      error.value = 'Unable to load loan options. Please try again later.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    loanOptions,
    isLoading,
    error,
    loadLoanOptions,
  }
}

export { useLoanOptions }
