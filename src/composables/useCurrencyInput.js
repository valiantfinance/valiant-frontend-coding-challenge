import { computed } from 'vue'

import { formatCurrency } from '@/utils/currency'
import { parseNumber } from '@/utils/parseNumber'

/**
 * Creates a currency input binding that formats values for display
 * and converts user input back into a numeric value.
 *
 * @param {Ref} amountRef - Reactive numeric value to update.
 * @returns {Object} Formatted currency input binding.
 */
const useCurrencyInput = (amountRef) => {
  const amountInput = computed({
    get: () => formatCurrency(amountRef.value),

    set: (value) => {
      amountRef.value = parseNumber(value)
    },
  })

  return {
    amountInput,
  }
}

export { useCurrencyInput }
