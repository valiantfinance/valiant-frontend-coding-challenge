import { ref } from 'vue'
import { describe, expect, it } from 'vitest'

import { useCurrencyInput } from '@/composables/useCurrencyInput'

describe('useCurrencyInput', () => {
  it('formats the underlying ref value for display', () => {
    const amount = ref(1000)
    const { amountInput } = useCurrencyInput(amount)

    expect(amountInput.value).toBe('$1,000')
  })

  it('renders an empty string when the underlying ref is null', () => {
    const amount = ref(null)
    const { amountInput } = useCurrencyInput(amount)

    expect(amountInput.value).toBe('')
  })

  it('parses formatted input back into a number on the underlying ref', () => {
    const amount = ref(null)
    const { amountInput } = useCurrencyInput(amount)

    amountInput.value = '$1,000'

    expect(amount.value).toBe(1000)
    expect(amountInput.value).toBe('$1,000')
  })

  it('clears the underlying ref when the input is emptied', () => {
    const amount = ref(1000)
    const { amountInput } = useCurrencyInput(amount)

    amountInput.value = ''

    expect(amount.value).toBeNull()
  })

  it('clears the underlying ref when the input has no digits', () => {
    const amount = ref(1000)
    const { amountInput } = useCurrencyInput(amount)

    amountInput.value = 'abc'

    expect(amount.value).toBeNull()
  })
})
