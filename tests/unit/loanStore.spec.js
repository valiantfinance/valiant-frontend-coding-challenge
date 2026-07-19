import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useLoanStore } from '@/stores/loanStore'

describe('useLoanStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with empty domain state and no fields touched', () => {
    const store = useLoanStore()

    expect(store.amount).toBeNull()
    expect(store.period).toBe('')
    expect(store.purpose).toBe('')
    expect(store.term).toBe('')
    expect(store.form.touched).toEqual({
      amount: false,
      purpose: false,
      period: false,
      term: false,
    })
  })

  it('reports validation errors for empty required fields', () => {
    const store = useLoanStore()

    expect(store.form.errors.amount).toBe('Loan amount is required')
    expect(store.form.errors.purpose).toBe('Loan purpose is required')
    expect(store.form.errors.period).toBe('Repayment period is required')
    expect(store.form.errors.term).toBe('Loan term is required')
    expect(store.form.isValid).toBe(false)
  })

  it('does not calculate a summary while the form is invalid', () => {
    const store = useLoanStore()

    store.amount = 5000
    expect(store.summary).toBeNull()
  })

  it('calculates a summary once all fields are valid', () => {
    const store = useLoanStore()

    store.amount = 30000
    store.purpose = 0.1
    store.period = 12
    store.term = 24

    expect(store.form.isValid).toBe(true)
    expect(store.summary).not.toBeNull()
    expect(Math.trunc(store.summary.repayments)).toBe(1384)
  })

  it('flags an amount below the minimum even when other fields are valid', () => {
    const store = useLoanStore()

    store.amount = 500
    store.purpose = 0.1
    store.period = 12
    store.term = 24

    expect(store.form.errors.amount).toBe('Minimum loan amount is $1,000')
    expect(store.form.isValid).toBe(false)
    expect(store.summary).toBeNull()
  })

  it('flags an amount above the maximum', () => {
    const store = useLoanStore()

    store.amount = 30000000

    expect(store.form.errors.amount).toBe('Maximum loan amount is $20,000,000')
  })

  describe('touch', () => {
    it('marks a single field as touched', () => {
      const store = useLoanStore()

      store.touch('amount')

      expect(store.form.touched.amount).toBe(true)
      expect(store.form.touched.purpose).toBe(false)
    })

    it('ignores unknown field names', () => {
      const store = useLoanStore()

      expect(() => store.touch('doesNotExist')).not.toThrow()
      expect(store.form.touched).toEqual({
        amount: false,
        purpose: false,
        period: false,
        term: false,
      })
    })
  })

  describe('touchAll', () => {
    it('marks every field as touched', () => {
      const store = useLoanStore()

      store.touchAll()

      expect(store.form.touched).toEqual({
        amount: true,
        purpose: true,
        period: true,
        term: true,
      })
    })
  })
})
