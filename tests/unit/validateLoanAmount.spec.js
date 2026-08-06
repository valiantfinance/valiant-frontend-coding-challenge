import { validateLoanAmount } from '@/utils/validateLoanAmount'

describe('validateLoanAmount', () => {
  it('treats an empty amount as incomplete without showing an error', () => {
    expect(validateLoanAmount('')).toEqual({
      isValid: false,
      error: '',
    })
  })

  it('rejects an amount below the minimum', () => {
    expect(validateLoanAmount('999').isValid).toBe(false)
  })

  it('accepts the minimum amount', () => {
    expect(validateLoanAmount('1000').isValid).toBe(true)
  })

  it('accepts the maximum amount', () => {
    expect(validateLoanAmount('20000000').isValid).toBe(true)
  })

  it('rejects an amount above the maximum', () => {
    expect(validateLoanAmount('20000001').isValid).toBe(false)
  })

  it('rejects non-digit input', () => {
    expect(validateLoanAmount('30,000').isValid).toBe(false)
  })
})
