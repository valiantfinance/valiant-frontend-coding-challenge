import { describe, expect, it } from 'vitest'

import { calculateLoanSummary } from '@/utils/loanCalculator'

describe('calculateLoanSummary', () => {
  it('splits the principal evenly across periods when the rate is zero', () => {
    const result = calculateLoanSummary({
      amount: 12000,
      period: 12,
      purpose: 0,
      term: 12,
    })

    expect(result.monthlyRepayments).toBe(1000)
    expect(result.totalRepayments).toBe(12000)
  })

  it('matches the known PMT result for a monthly repayment schedule', () => {
    // Rate/period/nper mirror tests/unit/PMT.spec.js (0.1 / 12, 24, 30000).
    const result = calculateLoanSummary({
      amount: 30000,
      period: 12,
      purpose: 0.1,
      term: 24,
    })

    expect(Math.trunc(result.monthlyRepayments)).toBe(1384)
    expect(result.totalRepayments).toBeCloseTo(result.monthlyRepayments * 24, 2)
  })

  it('accounts for repayment periods other than monthly (e.g. weekly)', () => {
    const result = calculateLoanSummary({
      amount: 12000,
      period: 52,
      purpose: 0,
      term: 12,
    })

    // totalPeriods = term * (period / 12) = 12 * (52 / 12) = 52
    expect(result.monthlyRepayments).toBeCloseTo(12000 / 52, 2)
    expect(result.totalRepayments).toBeCloseTo(result.monthlyRepayments * 52, 2)
  })

  it('always returns positive repayment values', () => {
    const result = calculateLoanSummary({
      amount: 5000,
      period: 12,
      purpose: 0.045,
      term: 6,
    })

    expect(result.monthlyRepayments).toBeGreaterThan(0)
    expect(result.totalRepayments).toBeGreaterThan(0)
  })
})
