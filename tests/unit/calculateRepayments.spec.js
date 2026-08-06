import calculateRepayments from '@/utils/calculateRepayments'

describe('calculateRepayments', () => {
  it('calculates the supplied monthly repayment example', () => {
    const result = calculateRepayments({
      amount: 30000,
      annualRate: 0.1,
      periodsPerYear: 12,
      termMonths: 24,
    })

    expect(result).toEqual({
      repaymentPerPeriod: 1384,
      totalRepayments: 33216,
    })
  })

  it('calculates repayments using a different repayment frequency', () => {
    const result = calculateRepayments({
      amount: 30000,
      annualRate: 0.1,
      periodsPerYear: 26,
      termMonths: 24,
    })

    expect(result).toEqual({
      repaymentPerPeriod: 638,
      totalRepayments: 33176,
    })
  })
})
